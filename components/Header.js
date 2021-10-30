import { useState } from 'react';
import styled from 'styled-components';

import Cart from './Cart';
import Icon from './Icon';
import Logo from './Logo';
import SearchInput from './SearchInput';
import UnstyledButton from './UnstyledButton';
import VisuallyHidden from './VisuallyHidden';

function Header() {
    const [showCart, setShowCart] = useState(false);

    return (
        <header>
            <MainHeader>
                <Logo />
                <Actions>
                    <SearchInput />
                    {/* <Link href='/account'>
                        <IconButton>
                            <VisuallyHidden>Account</VisuallyHidden>
                            <Icon id='user' />
                        </IconButton>
                    </Link> */}

                    <IconButton onClick={() => setShowCart(true)}>
                        <VisuallyHidden>Open Cart</VisuallyHidden>
                        <Icon id='shopping-cart' />
                    </IconButton>
                </Actions>
            </MainHeader>

            {showCart && <Cart isOpen={showCart} onDismiss={() => setShowCart(false)} />}
        </header>
    );
}

const MainHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 32px;
    border-bottom: 1px solid var(--gray-300);
`;

const Actions = styled.div`
    display: flex;
    gap: 32px;
`;

const IconButton = styled(UnstyledButton)`
    color: var(--gray-700);

    &:hover {
        color: var(--black);
    }
`;

export default Header;
