import formatMoney from '../util/formatMoney';
import { useCart } from '../hooks/useCart';

function CartItem({ slug, name, price }) {
    const { removeFromCart } = useCart();
    return (
        <div>
            <div>{name}</div>
            <div>{formatMoney(price)}</div>
            <button type='button' onClick={() => removeFromCart(slug)}>
                Remove from Cart
            </button>
        </div>
    );
}

export default CartItem;
