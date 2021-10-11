import { gql, request } from 'graphql-request';
import { endpoint } from '../config';

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

async function getProducts() {
    return request(endpoint, ALL_PRODUCTS_QUERY);
}

export default getProducts;
