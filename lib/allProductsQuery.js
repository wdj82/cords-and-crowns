import { gql, graphCMSClient } from './graphCMSClient';

const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY {
        products(first: 1000) {
            name
            price
            description
            slug
            available
            categories {
                name
            }
            images(first: 1) {
                url
            }
        }
    }
`;

export default async function allProductsQuery() {
    return graphCMSClient.request(ALL_PRODUCTS_QUERY);
}
