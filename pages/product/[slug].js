import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import Head from 'next/head';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';

import { getProduct, getSlugs } from '../../util/gqlUtil';
import { useCart } from '../../hooks/useCart';
import { publicStripeKey } from '../../config';

const stripePromise = loadStripe(publicStripeKey);

function SingleProductPage({ dehydratedState }) {
    const [working, setWorking] = useState(false);
    const { name, price, description, images, slug } = dehydratedState.queries[0].state.data.product;
    const { addToCart } = useCart();

    async function buyNow(e) {
        e.preventDefault();
        setWorking(true);
        const stripe = await stripePromise;

        const session = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keys: [slug],
            }),
        }).then((resp) => resp.json());

        await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        setWorking(false);
    }

    return (
        <div>
            <Head>
                <title>Cords&amp;Crowns | {name}</title>
            </Head>
            <h1>{name}</h1>
            <p>{price}</p>
            <p>{description}</p>
            {images.map((image) => (
                <Image key={image.fileName} src={image.url} alt={name} width={500} height={375} />
            ))}
            <button type='button' onClick={() => addToCart({ slug, name, price, image: images[0] })}>
                Add to Cart
            </button>
            <button type='button' onClick={buyNow} disabled={working}>
                Buy Now
            </button>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['product', params.slug], () => getProduct(params.slug));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const queryClient = new QueryClient();
    const data = await queryClient.fetchQuery('slugs', () => getSlugs());

    const paths = data?.products.map((product) => ({
        params: { slug: product.slug },
    }));
    return { paths, fallback: false };
}

export default SingleProductPage;
