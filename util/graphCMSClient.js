import { gql, GraphQLClient } from 'graphql-request';

const graphCMSClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT);
const graphCMSMutationClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`,
    },
});

export { gql, graphCMSClient, graphCMSMutationClient };
