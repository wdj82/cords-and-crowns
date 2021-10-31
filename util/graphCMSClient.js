import { gql, GraphQLClient } from 'graphql-request';

const graphCMSClient = new GraphQLClient('https://api-us-east-1.graphcms.com/v2/ckv9uvsib102201z25vxo6jsw/master');
const graphCMSMutationClient = new GraphQLClient(
    'https://api-us-east-1.graphcms.com/v2/ckv9uvsib102201z25vxo6jsw/master',
    {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`,
        },
    },
);
const graphCMSOrdersClient = new GraphQLClient(
    'https://api-us-east-1.graphcms.com/v2/ckv9uvsib102201z25vxo6jsw/master',
    {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_ORDERS_TOKEN}`,
        },
    },
);

export { gql, graphCMSClient, graphCMSMutationClient, graphCMSOrdersClient };
