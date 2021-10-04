import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

// import { SKULLS } from '../data';
import ProductCard from './ProductCard';

const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY {
        allProducts {
            id
            name
            price
            description
            photo {
                id
                altText
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

function ProductGrid() {
    const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
    // console.log(data, error, loading);

    // TODO: Make loading component
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    const SKULLS = data.allProducts;

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
