import { gql, GraphQLClient } from 'graphql-request';

const graphCMSClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT);

export { gql, graphCMSClient };
