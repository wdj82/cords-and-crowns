import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    try {
        const { products, successURL, cancelURL } = req.body;

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
            tax_rates: ['txr_1Jr6svLL5XZLSAT1sCCTRizt'],
        }));

        const session = await stripe.checkout.sessions.create({
            success_url: `${successURL}?id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${cancelURL}`,
            mode: 'payment',
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US'],
            },
            line_items: lineItems,
        });
        res.status(201).json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was a problem creating the Stripe Checkout session' });
    }
};
