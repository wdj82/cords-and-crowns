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

    // make sure the request is actually from stripe
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
    try {
        await graphCMSCreateOrdersClient.request(
            gql`
                mutation UPSERT_ACCOUNT_MUTATION(
                    $email: String!
                    $data: [AccountOrdersCreateInput!]
                    $slugs: [String!]
                ) {
                    upsertAccount(
                        where: { email: $email }
                        upsert: {
                            create: { email: $email, orders: { create: $data } }
                            update: { orders: { create: $data } }
                        }
                    ) {
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
                email,
                slugs,
            },
        );
        console.log('created order');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was a problem creating the order on the backend' });
    }

    res.json({ message: 'success' });
};
