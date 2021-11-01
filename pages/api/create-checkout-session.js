import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
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
        tax_rates: ['txr_1Jq0ZmIMF3sWfaghFHqEamJX'],
    }));

    try {
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
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was a problem creating the Stripe Checkout session' });
    }
};
