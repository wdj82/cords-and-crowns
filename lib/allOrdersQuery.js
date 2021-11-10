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
    try {
        const { account } = await graphCMSOrdersClient.request(ALL_ORDERS_QUERY, { email });
        // console.log('account:', account);
        if (!account) {
            return { orders: null };
        }
        return { orders: account?.orders };
    } catch (error) {
        console.error('ERROR:', error);
        return { orders: null };
    }
}
