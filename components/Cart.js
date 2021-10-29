import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled, { keyframes } from 'styled-components';

import Icon from './Icon';
import UnstyledButton from './UnstyledButton';
import VisuallyHidden from './VisuallyHidden';
import { useCart } from '../hooks/useCart';
import formatMoney from '../util/formatMoney';

function Cart({ isOpen, onDismiss }) {
    const { cart, removeFromCart } = useCart();
    const keys = Object.keys(cart);
    let total = 0;

    return (
        <Overlay isOpen={isOpen} onDismiss={onDismiss}>
            <Backdrop />
            <Content aria-label='Shopping Cart'>
                <UnstyledButton type='button' onClick={onDismiss}>
                    <VisuallyHidden>Close Shopping Cart</VisuallyHidden>
                    <Icon id='close' />
                </UnstyledButton>
                {keys.map((key) => {
                    const { name, price } = cart[key];
                    total += price;
                    return (
                        <div key={name}>
                            <div>{name}</div>
                            <div>{formatMoney(price)}</div>
                            <button type='button' onClick={() => removeFromCart(name)}>
                                Remove from Cart
                            </button>
                        </div>
                    );
                })}
                {total > 0 ? (
                    <div>
                        <div>Total: {formatMoney(total)}</div>
                        <button type='button'>Check Out</button>
                    </div>
                ) : (
                    <div>Your Shopping Cart is empty</div>
                )}
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

export default Cart;
