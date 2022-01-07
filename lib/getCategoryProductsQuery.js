import { gql, graphCMSClient } from './graphCMSClient';

const GET_CATEGORY_PRODUCTS_QUERY = gql`
    query GET_CATEGORY_PRODUCTS($categoryName: String!) {
        products(where: { categories_some: { name: $categoryName } }) {
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

export default async function getCategoryProductsQuery(categoryName) {
    return graphCMSClient.request(GET_CATEGORY_PRODUCTS_QUERY, { categoryName });
}
