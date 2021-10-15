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

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        Product(where: { id: $id }) {
            name
            price
            description
            id
            photo {
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

async function getProduct(id) {
    const response = await request(endpoint, SINGLE_ITEM_QUERY, { id });
    return response;
}

export { getProducts, getProduct };
