import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

async function stripeCheckout(keys) {
    const stripe = await stripePromise;

    const session = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            keys,
        }),
    }).then((resp) => resp.json());

    await stripe.redirectToCheckout({
        sessionId: session.id,
    });
}

export default stripeCheckout;
