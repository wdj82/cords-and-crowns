import { graphCMSCreateOrdersClient, gql } from './graphCMSClient';

const UPSERT_ACCOUNT_MUTATION = gql`
    mutation UPSERT_ACCOUNT_MUTATION($email: String!, $data: [AccountOrdersCreateInput!], $slugs: [String!]) {
        upsertAccount(
            where: { email: $email }
            upsert: { create: { email: $email, orders: { create: $data } }, update: { orders: { create: $data } } }
        ) {
            orders(last: 1) {
                ... on Order {
                    stripeCheckoutId
                    id
                }
            }
        }

        updateManyProducts(where: { slug_in: $slugs }, data: { available: false }) {
            count
        }

        publishManyProducts(where: { slug_in: $slugs }, to: PUBLISHED) {
            count
        }
    }
`;

export default async function upsertAccountMutation(data, email, slugs) {
    return graphCMSCreateOrdersClient.request(UPSERT_ACCOUNT_MUTATION, { data, email, slugs });
}
