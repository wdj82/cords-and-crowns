import Link from 'next/link';
import styled from 'styled-components';
import UnstyledButton from './UnstyledButton';

function Logo() {
    return (
        <Link href='/'>
            <UnstyledButton>
                <Wrapper>Cords and Crowns</Wrapper>
            </UnstyledButton>
        </Link>
    );
}

const Wrapper = styled.h1`
    font-size: 1.5rem;
    font-weight: var(--bold);
    cursor: pointer;
`;

export default Logo;
