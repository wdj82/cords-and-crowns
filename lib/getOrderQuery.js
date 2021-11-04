import { gql, graphCMSOrdersClient } from './graphCMSClient';

const GET_ORDER_QUERY = gql`
    query GET_ORDER_QUERY($id: String!) {
        order(where: { stripeCheckoutId: $id }) {
            id
            total
            subtotal
            tax
            orderItems {
                price
                slug
                name
                image
            }
        }
    }
`;

export default async function getOrderQuery(id) {
    try {
        return graphCMSOrdersClient.request(GET_ORDER_QUERY, id);
    } catch (error) {
        console.log(error);
        return { order: null };
    }
}
