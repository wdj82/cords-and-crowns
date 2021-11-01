import { gql, graphCMSClient } from './graphCMSClient';

const FILTER_PRODUCTS_QUERY = gql`
    query FILTER_PRODUCTS_QUERY($slug: [String!]) {
        products(where: { slug_in: $slug }) {
            name
            price
            slug
            available
        }
    }
`;

export default async function filterProductsQuery(slugs) {
    return graphCMSClient.request(FILTER_PRODUCTS_QUERY, slugs);
}
