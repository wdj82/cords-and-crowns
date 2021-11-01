import { gql, graphCMSClient } from './graphCMSClient';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($slug: String!) {
        product(where: { slug: $slug }) {
            name
            price
            description
            slug
            available
            images {
                url
                fileName
            }
        }
    }
`;

export default async function getProductQuery(slug) {
    return graphCMSClient.request(SINGLE_ITEM_QUERY, { slug });
}
