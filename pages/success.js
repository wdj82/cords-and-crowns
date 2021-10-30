import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import formatMoney from '../util/formatMoney';
import { getOrder } from '../util/gqlUtil';

function SuccessPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(Boolean(router.query.id));
    const [orderDetails, setOrderDetails] = useState();

    useEffect(() => {
        const fetchOrder = async () => {
            console.log(router.query.id);
            const { order } = await getOrder({ id: router.query.id });
            console.log(order);
            setLoading(false);
            setOrderDetails(order);
        };

        if (router.query.id) {
            fetchOrder();
        }
    }, [router.query.id]);

    if (loading) return <div>Loading...</div>;

    if (orderDetails) {
        return (
            <div>
                <h2>Thank you for your order!</h2>
                Total Payment: {formatMoney(orderDetails.total)}
                {orderDetails.orderItems.map((item) => (
                    <div key={item.product.name}>
                        {item.product.name} {formatMoney(item.product.price)}
                    </div>
                ))}
            </div>
        );
    }

    return null;
}

export default SuccessPage;
