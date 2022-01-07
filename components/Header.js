import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useCart } from '../hooks/useCart';
import Cart from './Cart';
import Contact from './Contact';
import Icon from './Icon';
import Logo from './Logo';
// import SearchInput from './SearchInput';
import UnstyledButton from './UnstyledButton';
import VisuallyHidden from './VisuallyHidden';

function Header() {
    const [showCart, setShowCart] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const { cart } = useCart();
    const [itemsInCart, setItemsInCart] = useState(0);

    useEffect(() => {
        setItemsInCart(Object.keys(cart).length);
    }, [cart]);

    return (
        <MainHeader>
            <Logo />
            <Actions>
                {/* <SearchInput /> */}
                {/* <Link href='/account'>
                        <IconButton>
                            <VisuallyHidden>Account</VisuallyHidden>
                            <Icon id='user' />
                        </IconButton>
                    </Link> */}

                <IconButton onClick={() => setShowCart(true)}>
                    <VisuallyHidden>Open Cart</VisuallyHidden>
                    <Icon id='shopping-cart' size='48' />
                    {itemsInCart > 0 && <CartNumber>{itemsInCart}</CartNumber>}
                </IconButton>

                <IconButton onClick={() => setShowContact(true)}>
                    <VisuallyHidden>Contact Information</VisuallyHidden>
                    <Icon id='contact' size='48' />
                </IconButton>
            </Actions>
            {showCart && <Cart isOpen={showCart} onDismiss={() => setShowCart(false)} />}
            {showContact && <Contact isOpen={showContact} onDismiss={() => setShowContact(false)} />}
        </MainHeader>
    );
}

const MainHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 18px 32px;
    border-bottom: 1px solid var(--gray-300);
    background: var(--gray-100);
`;

const Actions = styled.div`
    position: absolute;
    display: flex;
    gap: 32px;
    right: 32px;
`;

const IconButton = styled(UnstyledButton)`
    position: relative;
    color: var(--gray-700);

    &:hover {
        color: var(--black);
    }
`;

const CartNumber = styled.span`
    position: absolute;
    min-width: 20px;
    height: 20px;
    padding: 4px;
    border-radius: 1000px;
    background: var(--red-100);
    top: 2px;
    left: 21px;
    font-weight: var(--normal);
    font-size: 0.8rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Header;
