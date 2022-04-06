import Link from 'next/link';
import styled from 'styled-components';
import UnstyledButton from './UnstyledButton';

function Logo() {
    return (
        <Wrapper>
            <Link href='/'>
                <UnstyledButton>
                    <Header>Cords and Crowns</Header>
                </UnstyledButton>
            </Link>
            <SubHeader>Hand Crafted Jewelry, Flower Crowns, and Themed Decor</SubHeader>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Header = styled.h1`
    font-family: 'Oleo Script', cursive;
    font-size: 7.5rem;
    color: hsla(326, 93%, 51%, 1);
    /* font-weight: var(--bold); */
    cursor: pointer;
`;

const SubHeader = styled.h2`
    font-size: 2.5rem;
`;

export default Logo;
