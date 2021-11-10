import Image from 'next/image';
import styled from 'styled-components';

import formatMoney from '../lib/formatMoney';
import { useCart } from '../hooks/useCart';
import UnstyledButton from './UnstyledButton';

function CartItem({ slug }) {
    const { cart, removeFromCart } = useCart();
    const { name, price, image } = cart[slug];

    return (
        <Wrapper>
            <div>
                <Image src={image} alt={name} width={200} height={150} />
            </div>
            <Info>
                <div>{name}</div>
                <div>
                    <Bold>{formatMoney(price)}</Bold>
                </div>
                <RemoveButton type='button' onClick={() => removeFromCart(slug)}>
                    Remove from Cart
                </RemoveButton>
            </Info>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    gap: 16px;
    border: 1px solid var(--gray-300);
    padding: 16px;
    padding-bottom: 10px;
`;

const RemoveButton = styled(UnstyledButton)`
    color: blue;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
`;

export const Bold = styled.span`
    font-weight: var(--bold);
`;

export default CartItem;
