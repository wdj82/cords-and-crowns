import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQueries } from 'react-query';

import formatMoney from '../lib/formatMoney';
import stripeCheckout from '../lib/stripeCheckout';
import CartItem from './CartItem';
import { useCart } from '../hooks/useCart';
import getProductQuery from '../lib/getProductQuery';
import CartRemovedProducts from './CartRemovedProducts';

function CartBody({ onDismiss }) {
    const [working, setWorking] = useState(false);
    const { cart, total, removeFromCart } = useCart();
    const [removedProducts, setRemovedProducts] = useState([]);
    const slugs = Object.keys(cart);

    // query for each product in the cart to check if it's changed since being added
    const productQueries = useQueries(
        slugs.map((slug) => ({
            queryKey: ['product', slug],
            queryFn: () => getProductQuery(slug),
        })),
    );
    const isLoading = productQueries.some((query) => query.isLoading);

    // check if any products have sold out
    // if so remove from the cart
    useEffect(() => {
        if (!isLoading) {
            productQueries.forEach((product) => {
                if (!product.data.product.available) {
                    removeFromCart(product.data.product.slug);
                    // names.push(currQuery.data.product.name);
                    setRemovedProducts([...removedProducts, product.data.product.name]);
                }
            });
        }
    }, [isLoading, productQueries, removeFromCart, removedProducts]);

    const handleClick = async (e) => {
        e.preventDefault();
        setWorking(true);
        await stripeCheckout(productQueries);
        setWorking(false);
    };

    // TODO: Spinner
    if (isLoading) return <h3>Loading...</h3>;

    return (
        <Wrapper>
            {removedProducts.length > 0 && <CartRemovedProducts names={removedProducts} />}
            <Items>
                {slugs.map((slug) => (
                    <CartItem key={slug} slug={slug} />
                ))}
            </Items>
            {total > 0 ? (
                <Checkout>
                    <div>
                        Subtotal ({slugs.length} item{slugs.length > 1 && 's'}): <Money>{formatMoney(total)}</Money>
                    </div>
                    <Buttons>
                        <BuyButton type='button' onClick={handleClick} disabled={working}>
                            Check Out
                        </BuyButton>
                        <Link href='/'>
                            <Button type='button' onClick={onDismiss}>
                                Continue Shopping
                            </Button>
                        </Link>
                    </Buttons>
                </Checkout>
            ) : (
                <div>Your Shopping Cart is empty</div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 32px;
    gap: 32px;
`;

const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Checkout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const Button = styled.button`
    padding: 8px 24px;
    font-size: 1rem;
    font-weight: var(--bold);
    color: white;
    background: var(--gray-700);
    border-radius: 8px;
    border: none;
    width: 120px;

    &:hover,
    &:focus {
        background: var(--gray-900);
    }
`;

const BuyButton = styled(Button)`
    background: hsl(0, 50%, 50%);

    &:hover,
    &:focus {
        background: hsl(0, 80%, 50%);
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 16px;
`;

const Money = styled.span`
    font-weight: var(--bold);
`;

export default CartBody;
