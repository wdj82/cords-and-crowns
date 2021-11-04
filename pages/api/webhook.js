import Stripe from 'stripe';
import { buffer } from 'micro';

import { graphCMSCreateOrdersClient, gql } from '../../lib/graphCMSClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    const requestBuffer = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(requestBuffer, sig, process.env.STRIPE_WEBHOOK_SIGNING_SECRET);
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

    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ['line_items.data.price.product', 'customer'],
    });

    const lineItems = session.line_items.data;
    // console.log(lineItems);
    // console.log(lineItems[0].price.product);

    // TODO: account creation or update with the email
    // email: session.customer.email,
    const slugs = [];
    const data = {
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
    };
    // console.log(data);
    // console.log(data.orderItems);
    // console.log(slugs);

    // create the order, all order items for it, and set sold products to unavailable
    try {
        const { createOrder } = await graphCMSCreateOrdersClient.request(
            gql`
                mutation CreateOrderMutation($data: OrderCreateInput!, $slugs: [String!]) {
                    createOrder(data: $data) {
                        id
                    }

                    updateManyProducts(where: { slug_in: $slugs }, data: { available: false }) {
                        count
                    }

                    publishManyProducts(where: { slug_in: $slugs }, to: PUBLISHED) {
                        count
                    }
                }
            `,
            {
                data,
                slugs,
            },
        );
        console.log('createOrder: ', createOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was a problem creating the order on the backend' });
        return;
    }

    res.json({ message: 'success' });
};
