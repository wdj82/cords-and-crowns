import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';

import { useCart } from '../hooks/useCart';
import getOrderQuery from '../lib/getOrderQuery';
import formatMoney from '../util/formatMoney';

function SuccessPage(order) {
    // clear out the cart on purchase success
    const { setCart } = useCart();
    useEffect(() => {
        setCart({});
    }, [setCart]);

    if (order) {
        return (
            <div>
                <Head>
                    <title>Cords&amp;Crowns</title>
                </Head>
                <Header>
                    <h2>Thank you for your order!</h2>
                    <h3>You should receive an email invoice soon.</h3>
                    <div>
                        Order #: <Money>{order.id}</Money>
                    </div>
                </Header>
                {order.orderItems.map(({ product }) => (
                    <ProductWrapper key={product.slug}>
                        <div>
                            <Image src={product.images[0].url} alt={product.name} width={200} height={150} />
                        </div>
                        <Product>
                            <div>{product.name}</div>
                            <Money>{formatMoney(product.price)}</Money>
                        </Product>
                    </ProductWrapper>
                ))}
                <Footer>
                    <div>
                        Subtotal: <Money>{formatMoney(order.subtotal)}</Money>
                    </div>
                    <div>
                        Tax: <Money>{formatMoney(order.tax)}</Money>
                    </div>
                    <div>
                        Total Payment: <Money>{formatMoney(order.total)}</Money>
                    </div>
                </Footer>
            </div>
        );
    }

    return <Header>There was a problem loading your order details. You should receive an email invoice soon.</Header>;
}

export async function getServerSideProps({ query }) {
    const { order } = await getOrderQuery(query);
    return {
        props: order,
    };
}

const Header = styled.div`
    padding: 16px;
`;

const ProductWrapper = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px;
`;

const Product = styled.div`
    display: flex;
    flex-direction: column;
`;

const Money = styled.span`
    font-weight: var(--bold);
`;

const Footer = styled.footer`
    padding: 16px;
`;

export default SuccessPage;
