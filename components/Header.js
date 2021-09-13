// import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Icon from './Icon';

import Logo from './Logo';
import SearchInput from './SearchInput';
import UnstyledButton from './UnstyledButton';
import VisuallyHidden from './VisuallyHidden';

function Header() {
    // const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <header>
            <MainHeader>
                <Logo />
                <Actions>
                    <SearchInput />
                    <Link href='/cart' passHref>
                        <ShoppingCart>
                            <VisuallyHidden>Open Cart</VisuallyHidden>
                            <Icon id='shopping-cart' />
                        </ShoppingCart>
                    </Link>
                </Actions>
            </MainHeader>
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

const ShoppingCart = styled(UnstyledButton)`
    color: var(--gray-700);

    &:hover {
        color: var(--black);
    }
`;

export default Header;
