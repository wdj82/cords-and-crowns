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

    const data = {
        email: session.customer.email,
        tax: session.total_details.amount_tax,
        subtotal: session.amount_subtotal,
        total: session.amount_total,
        stripeCheckoutId: session.id,
        orderItems: {
            create: lineItems.map((item) => ({
                total: item.amount_total,
                product: {
                    connect: {
                        slug: item.price.product.metadata.productSlug,
                    },
                },
            })),
        },
    };

    try {
        const { createOrder } = await graphCMSCreateOrdersClient.request(
            gql`
                mutation CreateOrderMutation($data: OrderCreateInput!) {
                    createOrder(data: $data) {
                        id
                    }
                }
            `,
            {
                data,
            },
        );
        console.log('createOrder: ', createOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was a problem creating the order on the backend' });
        return;
    }

    // make purchased products unavailable
    try {
        const slugs = lineItems.map((item) => item.price.product.metadata.productSlug);
        await graphCMSCreateOrdersClient.request(
            gql`
                mutation ($data: [String!]) {
                    updateManyProductsConnection(where: { slug_in: $data }, data: { available: false }) {
                        edges {
                            node {
                                slug
                                available
                            }
                        }
                    }
                    publishManyProductsConnection(where: { slug_in: $data }, to: PUBLISHED) {
                        edges {
                            node {
                                id
                            }
                        }
                    }
                }
            `,
            {
                data: slugs,
            },
        );
        console.log('updated', slugs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was a problem updating the products on the backend' });
    }

    res.json({ message: 'success' });
};
