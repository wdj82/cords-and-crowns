import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';

import formatMoney from '../util/formatMoney';
import { getOrder } from '../util/gqlUtil';

function SuccessPage() {
    const { setCart } = useCart();
    const router = useRouter();

    const [loading, setLoading] = useState(Boolean(router.query.id));
    const [orderDetails, setOrderDetails] = useState();

    useEffect(() => {
        console.log(router.query);

        const fetchOrder = async () => {
            const result = await getOrder({ id: router.query.id });
            console.log(result);
            setLoading(false);
            setOrderDetails(result.order);
        };

        if (router.query.id) {
            fetchOrder();
            setCart({});
        }
    }, [router.query, setCart]);

    if (loading) return <div>Loading...</div>;

    if (orderDetails) {
        return (
            <div>
                <h2>Thank you for your order!</h2>
                {orderDetails.orderItems.map((item) => (
                    <div key={item.product.name}>
                        {item.product.name} {formatMoney(item.product.price)}
                    </div>
                ))}
                <div>Subtotal: {formatMoney(orderDetails.subtotal)}</div>
                <div>Tax: {formatMoney(orderDetails.tax)}</div>
                <div>Total Payment: {formatMoney(orderDetails.total)}</div>
            </div>
        );
    }

    return null;
}

export default SuccessPage;
