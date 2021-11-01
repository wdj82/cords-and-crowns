import { useState } from 'react';
import Link from 'next/link';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled, { keyframes } from 'styled-components';

import Icon from './Icon';
import UnstyledButton from './UnstyledButton';
import VisuallyHidden from './VisuallyHidden';
import { useCart } from '../hooks/useCart';
import formatMoney from '../util/formatMoney';
import CartItem from './CartItem';
import stripeCheckout from '../util/stripeCheckout';

function Cart({ isOpen, onDismiss }) {
    const [working, setWorking] = useState(false);
    const { cart } = useCart();
    const keys = Object.keys(cart);
    let total = 0;

    const handleClick = async (e) => {
        e.preventDefault();
        setWorking(true);
        await stripeCheckout(keys);
        setWorking(false);
    };

    return (
        <Overlay isOpen={isOpen} onDismiss={onDismiss}>
            <Backdrop />
            <Content aria-label='Shopping Cart'>
                <Header>
                    <CloseButton type='button' onClick={onDismiss}>
                        <VisuallyHidden>Close Shopping Cart</VisuallyHidden>
                        <Icon id='close' size='36' />
                    </CloseButton>
                    <Title>Your Cart</Title>
                </Header>
                <CartBody>
                    <Items>
                        {keys.map((key) => {
                            const { slug, price } = cart[key];
                            total += price;
                            return <CartItem key={slug} slug={slug} />;
                        })}
                    </Items>
                    {total > 0 ? (
                        <Checkout>
                            <div>
                                Subtotal ({keys.length} item{keys.length > 1 && 's'}):{' '}
                                <Money>{formatMoney(total)}</Money>
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
                </CartBody>
            </Content>
        </Overlay>
    );
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled(DialogOverlay)`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: transparent;
    display: flex;
    justify-content: flex-end;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: var(--color-backdrop);
    animation: ${fadeIn} 500ms;
`;

const Content = styled(DialogContent)`
    position: relative;
    background: white;
    width: 500px;
    height: 100%;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${slideIn} 500ms both cubic-bezier(0, 0.6, 0.32, 1.06);
        animation-delay: 200ms;
    }
`;

const Header = styled.header`
    padding: 32px;
    padding-bottom: 8px;
`;

const CloseButton = styled(UnstyledButton)`
    position: absolute;
    top: 0;
    left: -48px;
    color: white;
`;
const Title = styled.h2`
    font-size: 1.5rem;
`;

const CartBody = styled.div`
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
    background: hsl(36deg, 100%, 50%);

    &:hover,
    &:focus {
        background: hsl(40, 100%, 50%);
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 16px;
`;

const Money = styled.span`
    font-weight: var(--bold);
`;

export default Cart;
