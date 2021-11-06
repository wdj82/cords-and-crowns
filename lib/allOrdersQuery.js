import { gql, graphCMSOrdersClient } from './graphCMSClient';

const ALL_ORDERS_QUERY = gql`
    query ALL_ORDERS_QUERY($email: String!) {
        account(where: { email: $email }) {
            orders {
                ... on Order {
                    id
                    total
                    orderItems {
                        name
                        slug
                        image
                    }
                    createdAt
                    address
                    orderStatus
                }
            }
        }
    }
`;

export default async function allOrdersQuery(email) {
    return graphCMSOrdersClient.request(ALL_ORDERS_QUERY, { email });
}
