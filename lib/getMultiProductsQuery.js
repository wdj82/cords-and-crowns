import { gql, graphCMSClient } from './graphCMSClient';

const GET_MULTI_PRODUCT_QUERY = gql`
    query GET_MULTI_PRODUCTS($slugs: [String!]) {
        products(where: { slug_in: $slugs }) {
            name
            price
            slug
            available
            images(first: 1) {
                url
            }
        }
    }
`;

export default async function getMultiProductsQuery(slugs) {
    return graphCMSClient.request(GET_MULTI_PRODUCT_QUERY, { slugs });
}
