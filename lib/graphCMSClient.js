import { gql, GraphQLClient } from 'graphql-request';

const graphCMSClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT);

const graphCMSOrdersClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_ORDERS_TOKEN}`,
    },
});
const graphCMSCreateOrdersClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_CREATE_ORDERS_MUTATION_TOKEN}`,
    },
});

export { gql, graphCMSClient, graphCMSCreateOrdersClient, graphCMSOrdersClient };
