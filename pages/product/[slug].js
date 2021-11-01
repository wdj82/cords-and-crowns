import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import styled from 'styled-components';
import allSlugsQuery from '../../lib/allSlugsQuery';
import getProductQuery from '../../lib/getProductQuery';
import { useCart } from '../../hooks/useCart';
import stripeCheckout from '../../util/stripeCheckout';
import Cart from '../../components/Cart';
import formatMoney from '../../util/formatMoney';

function SingleProductPage() {
    const [working, setWorking] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const { addToCart } = useCart();
    const router = useRouter();

    // enabled option tells the query to wait until the router is ready so we can get the slug
    const { data, error, isLoading } = useQuery(
        ['product', router.query.slug],
        () => getProductQuery(router.query.slug),
        {
            enabled: !!router.query.slug,
        },
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.error(error);
        return <div>Problem loading product. Please try again later.</div>;
    }

    const { name, price, description, images, available, slug } = data.product;
    // console.log({ name, price, description, images, available, slug });

    const buyNow = async (e) => {
        e.preventDefault();
        setWorking(true);
        await stripeCheckout([slug]);
        setWorking(false);
    };

    return (
        <div>
            <Head>
                <title>Cords&amp;Crowns | {name}</title>
            </Head>
            <Header>
                <h1>{name}</h1>
                {available ? <p>{formatMoney(price)}</p> : <p>Sold Out</p>}
                <p>{description}</p>
            </Header>
            <ImageWrapper>
                {images.map((image) => (
                    <div key={image.fileName}>
                        <Image src={image.url} alt={name} width={500} height={375} />
                    </div>
                ))}
            </ImageWrapper>
            <Footer>
                <Button
                    type='button'
                    onClick={() => {
                        addToCart({ slug, name, price, image: images[0] });
                        setShowCart(true);
                    }}
                    disabled={!available}
                >
                    Add to Cart
                </Button>
                <BuyButton type='button' onClick={buyNow} disabled={working || !available}>
                    Buy Now
                </BuyButton>
            </Footer>
            {showCart && <Cart isOpen={showCart} onDismiss={() => setShowCart(false)} />}
        </div>
    );
}

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['product', params.slug], () => getProductQuery(params.slug));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        // revalidate: 60,
    };
}

export async function getStaticPaths() {
    const data = await allSlugsQuery();
    const paths = data?.products.map((product) => ({
        params: { slug: product.slug },
    }));
    return { paths, fallback: false };
}

const Header = styled.header`
    padding: 32px;
`;

const ImageWrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
`;

const Footer = styled.footer`
    padding: 32px;
    display: flex;
    gap: 16px;
`;

const Button = styled.button`
    padding: 8px 24px;
    font-size: 1rem;
    font-weight: var(--bold);
    color: white;
    background: var(--gray-700);
    border-radius: 8px;
    border: none;

    &:hover,
    &:focus {
        background: var(--gray-900);
    }
`;

const BuyButton = styled(Button)`
    background: hsl(36deg, 100%, 50%);

    &:hover,
    &:focus {
        background: hsl(40, 100%, 50%);
    }
`;

export default SingleProductPage;
