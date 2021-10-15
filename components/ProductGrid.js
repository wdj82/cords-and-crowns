import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getProducts } from '../util/gqlUtil';
import ProductCard from './ProductCard';

function ProductGrid() {
    const { data, error, isLoading } = useQuery('products', () => getProducts, { staleTime: 30000 });

    //  TODO: Make loading component
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    const SKULLS = data?.allProducts;
    // console.log(SKULLS);

    return (
        <Wrapper>
            {SKULLS.map((skull) => (
                <div key={skull.id}>
                    <ProductCard {...skull} />
                </div>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
`;

export default ProductGrid;
