/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';

import { useCart } from '../hooks/useCart';
import getOrderQuery from '../lib/getOrderQuery';
import formatMoney from '../lib/formatMoney';

function SuccessPage(order) {
    // clear out the cart on purchase success
    const { cart, clearCart } = useCart();
    useEffect(() => {
        if (Object.keys(cart).length > 0) {
            clearCart();
        }
    }, [cart, clearCart]);

    // check if order object is empty
    if (Object.keys(order).length === 0) {
        return (
            <>
                <Head>
                    <title>Cords&amp;Crowns</title>
                </Head>
                <Header>
                    There was a problem loading your order details. You should receive an email invoice soon.
                </Header>
            </>
        );
    }

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
                        Order #: <Bold>{order.id}</Bold>
                    </div>
                </Header>
                {order.orderItems.map((product) => (
                    <ProductWrapper key={product.slug}>
                        <div>
                            <Image src={product.image} alt={product.name} width={200} height={150} />
                        </div>
                        <Product>
                            <div>{product.name}</div>
                            <Bold>{formatMoney(product.price)}</Bold>
                        </Product>
                    </ProductWrapper>
                ))}
                <Footer>
                    <div>
                        Subtotal: <Bold>{formatMoney(order.subtotal)}</Bold>
                    </div>
                    <div>
                        Tax: <Bold>{formatMoney(order.tax)}</Bold>
                    </div>
                    <div>
                        Total Payment: <Bold>{formatMoney(order.total)}</Bold>
                    </div>
                </Footer>
            </div>
        );
    }
}

export async function getServerSideProps({ query }) {
    const { order } = await getOrderQuery(query);
    if (order !== null) {
        // console.log(order);

        return {
            props: order,
        };
    }
    return { props: {} };
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

const Footer = styled.footer`
    padding: 16px;
`;

export const Bold = styled.span`
    font-weight: var(--bold);
`;

export default SuccessPage;
