import Stripe from 'stripe';

import { graphCMSClient, gql } from '../../util/graphCMSClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const endpointSecret = 'whsec_hEDnZ6KVrLOSBmwC7HQ9S0PebSfKPTsa'

export default async (req, res) => {
    const event = req.body;
    // const sig = req.headers['stripe-signature'];

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

    const createOrder = await graphCMSClient.request(
        gql`
            mutation CreateOrderMutation($data: OrderCreateInput!, $id: String!) {
                createOrder(data: $data) {
                    id
                }
                publishOrder(where: { stripeCheckoutId: $id }) {
                    id
                }
            }
        `,
        {
            data,
            id: data.stripeCheckoutId,
        },
    );
    console.log('createOrder: ', createOrder);

    // make purchased products unavailable
    const slugs = lineItems.map((item) => item.price.product.metadata.productSlug);
    const update = await graphCMSClient.request(
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

    console.log('update', update);
    res.json({ message: 'success' });
};
