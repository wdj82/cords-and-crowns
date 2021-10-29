import Stripe from 'stripe';

import { graphCMSClient, gql } from '../../util/graphCMSClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { keys } = req.body;

    const { products } = await graphCMSClient.request(
        gql`
            query FILTER_SLUGS($slug: [String!]) {
                products(where: { slug_in: $slug }) {
                    name
                    price
                    slug
                }
            }
        `,
        {
            slug: keys,
        },
    );

    const lineItems = products.map((product) => ({
        price_data: {
            unit_amount: product.price,
            currency: 'USD',
            product_data: {
                name: product.name,
                metadata: {
                    productSlug: product.slug,
                },
            },
        },
        quantity: 1,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:7777/success',
            cancel_url: `http://localhost:7777/`,
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: lineItems,
        });
        res.json(session);
        return;
    } catch (e) {
        res.json({ error: { message: e } });
    }
};
