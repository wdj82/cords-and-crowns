import { useQuery } from 'react-query';
import styled from 'styled-components';

import allProductsQuery from '../lib/allProductsQuery';
import { QUERIES } from '../util/constants';
import ProductCard from './ProductCard';

function ProductGrid() {
    const { data, error, isLoading } = useQuery('products', () => allProductsQuery());

    //  TODO: Make loading component
    if (isLoading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    const SKULLS = data?.products;
    // console.log(SKULLS);

    return (
        <Wrapper>
            {SKULLS.map((skull) => (
                <div key={skull.slug}>
                    <ProductCard {...skull} />
                </div>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

    @media ${QUERIES.phone} {
        display: flex;
        flex-direction: column;
        gap: 0;
    }
`;

export default ProductGrid;
