import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import getOrderQuery from '../lib/getOrderQuery';

import formatMoney from '../util/formatMoney';

function SuccessPage(props) {
    const { setCart } = useCart();
    useEffect(() => {
        setCart({});
    }, [setCart]);

    if (props) {
        return (
            <div>
                <h2>Thank you for your order!</h2>
                {props.orderItems.map((item) => (
                    <div key={item.product.name}>
                        {item.product.name} {formatMoney(item.product.price)}
                    </div>
                ))}
                <div>Subtotal: {formatMoney(props.subtotal)}</div>
                <div>Tax: {formatMoney(props.tax)}</div>
                <div>Total Payment: {formatMoney(props.total)}</div>
            </div>
        );
    }

    return <div>There was a problem loading your order details</div>;
}

export async function getServerSideProps({ query }) {
    const { order } = await getOrderQuery(query);
    return {
        props: order,
    };
}

export default SuccessPage;
