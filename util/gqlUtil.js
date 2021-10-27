import { gql, request, GraphQLClient } from 'graphql-request';
import { endpoint } from '../config';

const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY {
        products {
            name
            price
            description
            slug
            images(first: 1) {
                url
            }
        }
    }
`;

const ALL_SLUGS_QUERY = gql`
    query ALL_SLUGS_QUERY {
        products {
            slug
        }
    }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($slug: String!) {
        product(where: { slug: $slug }) {
            name
            price
            description
            images {
                url
                fileName
            }
        }
    }
`;

const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id
                email
                cart {
                    id
                    quantity
                    product {
                        id
                        name
                        description
                        price
                        photo {
                            image {
                                publicUrlTransformed
                            }
                        }
                    }
                }
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

async function getSlugs() {
    return request(endpoint, ALL_SLUGS_QUERY);
}

async function getProduct(slug) {
    return request(endpoint, SINGLE_ITEM_QUERY, { slug });
}

async function getCurrentUser() {
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            credentials: 'include',
            mode: 'cors',
        },
    });
    const res = await graphQLClient.request(CURRENT_USER_QUERY);
    console.log(res);
    return res;
}

async function signInMutation(variables) {
    console.log(variables);
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            credentials: 'include',
            mode: 'cors',
        },
    });
    const { data, headers } = await graphQLClient.rawRequest(SIGN_IN_MUTATION, variables);
    console.log(headers);
    return data;
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
    getSlugs,
    getProduct,
    getCurrentUser,
    signInMutation,
    signOutMutation,
    signUpMutation,
    resetPasswordRequestMutation,
    resetPasswordMutation,
};
