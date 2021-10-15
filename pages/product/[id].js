import { useRouter } from 'next/router';

import SingleProduct from '../../components/SingleProduct';

function SingleProductPage() {
    const { id } = useRouter().query;

    return <SingleProduct id={id} />;
}
export default SingleProductPage;
