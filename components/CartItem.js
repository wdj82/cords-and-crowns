import styled from 'styled-components';

import formatMoney from '../util/formatMoney';
import { useCart } from '../hooks/useCart';

function CartItem({ slug, name, price }) {
    const { removeFromCart } = useCart();
    return (
        <Wrapper>
            <ImageWrapper>Image</ImageWrapper>
            <div>{name}</div>
            <div>{formatMoney(price)}</div>
            <button type='button' onClick={() => removeFromCart(slug)}>
                Remove from Cart
            </button>
        </Wrapper>
    );
}

const Wrapper = styled.div``;

const ImageWrapper = styled.div``;

export default CartItem;
