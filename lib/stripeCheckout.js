import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_TEST_STRIPE_KEY}`);

async function stripeCheckout(slugs) {
    const stripe = await stripePromise;

    // create a new stripe session and redirect to it
    const session = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            slugs,
            successURL: `${window.location.origin}/success`,
            cancelURL: `${window.location.origin}/`,
        }),
    }).then((resp) => resp.json());

    await stripe.redirectToCheckout({
        sessionId: session.id,
    });
}

export default stripeCheckout;
