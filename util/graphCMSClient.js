import { gql, GraphQLClient } from 'graphql-request';
import { endpoint, mutationToken } from '../config';

const graphCMSClient = new GraphQLClient(endpoint);
const graphCMSMutationClient = new GraphQLClient(endpoint, {
    headers: {
        Authorization: `Bearer ${mutationToken}`,
    },
});

export { gql, graphCMSClient, graphCMSMutationClient };
