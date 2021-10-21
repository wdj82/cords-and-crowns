import { gql, request } from 'graphql-request';
import { endpoint } from '../config';

const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY {
        allProducts {
            id
            name
            price
            description
            photo {
                id
                altText
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        Product(where: { id: $id }) {
            name
            price
            description
            id
            photo {
                altText
                image {
                    id
                    publicUrlTransformed
                }
            }
        }
    }
`;

const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        authenticatedItem {
            ... on User {
                id
                email
                name
            }
        }
    }
`;

const SIGN_IN_MUTATION = gql`
    mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    email
                    name
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }
    }
`;

const SIGN_OUT_MUTATION = gql`
    mutation {
        endSession
    }
`;

async function getProducts() {
    return request(endpoint, ALL_PRODUCTS_QUERY);
}

async function getProduct(id) {
    return request(endpoint, SINGLE_ITEM_QUERY, { id });
}

async function getCurrentUser() {
    return request(endpoint, CURRENT_USER_QUERY);
}

async function signInMutation(variables) {
    return request(endpoint, SIGN_IN_MUTATION, variables);
}

async function signOutMutation() {
    return request(endpoint, SIGN_OUT_MUTATION);
}

export { getProducts, getProduct, getCurrentUser, signInMutation, signOutMutation };
