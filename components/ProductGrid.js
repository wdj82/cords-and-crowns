import { useQuery } from 'react-query';
import styled from 'styled-components';

import { useCategory } from '../hooks/useCategory';
import allProductsQuery from '../lib/allProductsQuery';
import { QUERIES } from '../util/constants';
import ProductCard from './ProductCard';

function ProductGrid() {
    const { category } = useCategory();
    const { data, error, isLoading } = useQuery('products', () => allProductsQuery());

    //  TODO: Make loading component
    if (isLoading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    let products = data?.products;

    // console.log(products);
    if (category !== 'All Products') {
        // only show products that match the current category
        const currentProducts = products.filter(
            (product) => product.categories.filter((categories) => categories.name === category).length > 0,
        );
        console.log(currentProducts);
        products = currentProducts;
    }

    return (
        <Wrapper>
            {products.map((skull) => (
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
