import { gql, graphCMSClient } from './graphCMSClient';

const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY {
        products {
            name
            price
            description
            slug
            available
            images(first: 1) {
                url
            }
        }
    }
`;

export default async function allProductsQuery() {
    return graphCMSClient.request(ALL_PRODUCTS_QUERY);
}
