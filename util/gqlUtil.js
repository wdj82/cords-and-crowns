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
            }
        }
    }
`;

const SIGN_IN_MUTATION = gql`
    mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                sessionToken
                item {
                    id
                    email
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }
    }
`;

const SIGN_UP_MUTATION = gql`
    mutation SIGN_UP_MUTATION($email: String!, $password: String!) {
        createUser(data: { email: $email, password: $password }) {
            id
            email
        }
    }
`;

const SIGN_OUT_MUTATION = gql`
    mutation {
        endSession
    }
`;

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        sendUserPasswordResetLink(email: $email) {
            message
            code
        }
    }
`;

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($email: String!, $token: String!, $password: String!) {
        redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
            message
            code
        }
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

async function signUpMutation(variables) {
    return request(endpoint, SIGN_UP_MUTATION, variables);
}

async function resetPasswordRequestMutation(variables) {
    return request(endpoint, REQUEST_RESET_MUTATION, variables);
}

async function resetPasswordMutation(variables) {
    return request(endpoint, RESET_MUTATION, variables);
}

export {
    getProducts,
    getProduct,
    getCurrentUser,
    signInMutation,
    signOutMutation,
    signUpMutation,
    resetPasswordRequestMutation,
    resetPasswordMutation,
};
