import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

async function stripeCheckout(products) {
    const cart = products.map(
        ({
            data: {
                product: {
                    slug,
                    name,
                    price,
                    images: [{ url: image }],
                },
            },
        }) => ({ slug, name, price, image }),
    );

    const stripe = await stripePromise;

    const session = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            products: Object.values(cart),
            successURL: `${window.location.origin}/success`,
            cancelURL: `${window.location.origin}/`,
        }),
    }).then((resp) => resp.json());

    await stripe.redirectToCheckout({
        sessionId: session.id,
    });
}

export default stripeCheckout;
