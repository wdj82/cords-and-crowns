import { gql, GraphQLClient } from 'graphql-request';
import { endpoint } from '../config';

const graphCMSClient = new GraphQLClient(endpoint);

export { gql, graphCMSClient };
