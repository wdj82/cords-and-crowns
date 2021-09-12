import Link from 'next/link';
import styled from 'styled-components';

function Logo() {
    return (
        <Link href='/'>
            <Wrapper>Cords&amp;Crowns</Wrapper>
        </Link>
    );
}

const Wrapper = styled.h1`
    font-size: 1.5rem;
    font-weight: var(--bold);
    cursor: pointer;
`;

export default Logo;
