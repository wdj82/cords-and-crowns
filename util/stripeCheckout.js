import { loadStripe } from '@stripe/stripe-js';
import filterProductsQuery from '../lib/filterProductsQuery';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_TEST_STRIPE_KEY}`);

async function stripeCheckout(keys) {
    const { products } = await filterProductsQuery({ slug: keys });

    const stripe = await stripePromise;

    const session = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            products,
            successURL: `${window.location.origin}/success`,
            cancelURL: `${window.location.origin}/`,
        }),
    }).then((resp) => resp.json());

    await stripe.redirectToCheckout({
        sessionId: session.id,
    });
}

export default stripeCheckout;
