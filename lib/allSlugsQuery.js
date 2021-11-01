import { gql, graphCMSClient } from './graphCMSClient';

const ALL_SLUGS_QUERY = gql`
    query ALL_SLUGS_QUERY {
        products {
            slug
        }
    }
`;

export default async function allSlugsQuery() {
    return graphCMSClient.request(ALL_SLUGS_QUERY);
}
