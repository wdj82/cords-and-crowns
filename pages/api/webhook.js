import Stripe from 'stripe';
import { buffer } from 'micro';
import nodemailer from 'nodemailer';

import formatMoney from '../../lib/formatMoney';
import createHTML from '../../lib/createHTML';
import upsertAccountMutation from '../../lib/upsertAccountMutation';

const stripe = new Stripe(process.env.TEST_STRIPE_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    if (req.method !== 'POST') {
        console.log('not a post');
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    // make sure the request is actually from stripe
    const requestBuffer = await buffer(req);
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(requestBuffer, sig, process.env.TEST_STRIPE_WEBHOOK_SIGNING_SECRET);
    } catch (error) {
        console.log(error);
        res.status(400).send(`Webhook Error: ${error.message}`);
        return;
    }

    if (event.type !== 'checkout.session.completed') {
        res.status(500).json({ message: 'Unknown event' });
        return;
    }

    console.log('eventId: ', event.id);

    // get the order info from stripe expanding on product info
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ['line_items.data.price.product', 'customer'],
    });

    const lineItems = session.line_items.data;
    const { email } = session.customer;
    const slugs = [];

    // console.log(lineItems);
    // console.log(lineItems[0].price.product);
    // console.log(session.customer.email);
    // console.log(session.customer.shipping);

    // create the order for the cms
    const data = [
        {
            Order: {
                orderStatus: 'Processing',
                address: session.customer.shipping,
                tax: session.total_details.amount_tax,
                subtotal: session.amount_subtotal,
                total: session.amount_total,
                stripeCheckoutId: session.id,
                orderItems: {
                    create: lineItems.map((item) => {
                        slugs.push(item.price.product.metadata.productSlug);
                        return {
                            price: item.amount_total,
                            slug: item.price.product.metadata.productSlug,
                            image: item.price.product.images[0],
                            name: item.price.product.name,
                        };
                    }),
                },
            },
        },
    ];

    // console.log(data);
    // console.log(data[0].Order.orderItems);
    // console.log('slugs:', slugs);

    // create or update an account with the new order and make bought products unavailable
    let id = null;
    try {
        const {
            upsertAccount: { orders },
            updateManyProducts: { count },
        } = await upsertAccountMutation(data, email, slugs);
        id = orders.id;
        console.log('created order:', orders);
        console.log(`updated ${count} product${count > 1 ? 's' : ''}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was a problem creating the order on the backend' });
        return;
    }

    const { Order: order } = data[0];

    const htmlMessage = createHTML(email, id, order, session.customer.created);

    try {
        // send email of order details
        const smtp = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const message = await smtp.sendMail({
            to: email,
            from: 'admin@example.com',
            subject: 'Testing Email Sends',
            text: `
            Thank you for your order! Order #: ${id}. Total: ${formatMoney(order.total)}. 
            We will email you when your order is shipped. Thank you for shopping from us!
            `,
            html: htmlMessage,
        });
        console.log(message);
        console.log('order email sent');
    } catch (error) {
        console.error('ERROR sending order email:', error);
    }

    res.json({ message: 'success' });
};
