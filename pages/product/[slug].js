import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import Head from 'next/head';
import Image from 'next/image';

import { getProduct, getSlugs } from '../../util/gqlUtil';
import { useCart } from '../../hooks/useCart';
import stripeCheckout from '../../util/stripeCheckout';
import Cart from '../../components/Cart';

function SingleProductPage({ dehydratedState }) {
    const [working, setWorking] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const { name, price, description, images, slug } = dehydratedState.queries[0].state.data.product;
    const { addToCart } = useCart();

    async function buyNow(e) {
        e.preventDefault();
        setWorking(true);
        await stripeCheckout([slug]);
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
            <button
                type='button'
                onClick={() => {
                    addToCart({ slug, name, price, image: images[0] });
                    setShowCart(true);
                }}
            >
                Add to Cart
            </button>
            <button type='button' onClick={buyNow} disabled={working}>
                Buy Now
            </button>
            {showCart && <Cart isOpen={showCart} onDismiss={() => setShowCart(false)} />}
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
    const data = await getSlugs();

    const paths = data?.products.map((product) => ({
        params: { slug: product.slug },
    }));
    return { paths, fallback: false };
}

export default SingleProductPage;
