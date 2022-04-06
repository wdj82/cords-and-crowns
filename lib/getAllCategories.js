import { gql, graphCMSClient } from './graphCMSClient';

const ALL_CATEGORIES_QUERY = gql`
    query ALL_CATEGORIES_QUERY {
        categories(orderBy: name_ASC) {
            name
        }
    }
`;

export default async function getAllCategories() {
    return graphCMSClient.request(ALL_CATEGORIES_QUERY);
}
