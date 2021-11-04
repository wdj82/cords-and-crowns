import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled, { keyframes } from 'styled-components';

import Icon from './Icon';
import UnstyledButton from './UnstyledButton';
import VisuallyHidden from './VisuallyHidden';
import { QUERIES } from '../util/constants';
import CartBody from './CartBody';

function Cart({ isOpen, onDismiss }) {
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
                <CartBody onDismiss={onDismiss} />
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
    width: 425px;
    height: 100%;
    overflow-y: scroll;

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

    @media ${QUERIES.phone} {
        color: black;
        left: 0%;
    }
`;
const Title = styled.h2`
    font-size: 1.5rem;
`;

export default Cart;
