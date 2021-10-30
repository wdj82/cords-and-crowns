import { gql, graphCMSClient, graphCMSOrdersClient } from './graphCMSClient';

const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY {
        products {
            name
            price
            description
            slug
            available
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
            slug
            available
            images {
                url
                fileName
            }
        }
    }
`;

const ORDER_CHECKOUTID__QUERY = gql`
    query ($id: String!) {
        order(where: { stripeCheckoutId: $id }) {
            total
            orderItems {
                total
                product {
                    name
                    price
                }
            }
        }
    }
`;

// const SIGN_IN_MUTATION = gql`
//     mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
//         authenticateUserWithPassword(email: $email, password: $password) {
//             ... on UserAuthenticationWithPasswordSuccess {
//                 sessionToken
//                 item {
//                     id
//                     email
//                 }
//             }
//             ... on UserAuthenticationWithPasswordFailure {
//                 code
//                 message
//             }
//         }
//     }
// `;

// const SIGN_UP_MUTATION = gql`
//     mutation SIGN_UP_MUTATION($email: String!, $password: String!) {
//         createUser(data: { email: $email, password: $password }) {
//             id
//             email
//         }
//     }
// `;

// const SIGN_OUT_MUTATION = gql`
//     mutation {
//         endSession
//     }
// `;

// const REQUEST_PASSWORD_RESET_MUTATION = gql`
//     mutation REQUEST_RESET_MUTATION($email: String!) {
//         sendUserPasswordResetLink(email: $email) {
//             message
//             code
//         }
//     }
// `;

// const RESET_PASSWORD_MUTATION = gql`
//     mutation RESET_MUTATION($email: String!, $token: String!, $password: String!) {
//         redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
//             message
//             code
//         }
//     }
// `;

async function getProducts() {
    return graphCMSClient.request(ALL_PRODUCTS_QUERY);
}

async function getSlugs() {
    return graphCMSClient.request(ALL_SLUGS_QUERY);
}

async function getProduct(slug) {
    return graphCMSClient.request(SINGLE_ITEM_QUERY, { slug });
}

async function getOrder(id) {
    return graphCMSOrdersClient.request(ORDER_CHECKOUTID__QUERY, id);
}

// async function signInMutation(variables) {
//     return graphCMSClient.request(SIGN_IN_MUTATION, variables);
// }

// async function signOutMutation() {
//     return graphCMSClient.request(SIGN_OUT_MUTATION);
// }

// async function signUpMutation(variables) {
//     return graphCMSClient.request(SIGN_UP_MUTATION, variables);
// }

// async function resetPasswordRequestMutation(variables) {
//     return graphCMSClient.request(REQUEST_PASSWORD_RESET_MUTATION, variables);
// }

// async function resetPasswordMutation(variables) {
//     return graphCMSClient.request(RESET_PASSWORD_MUTATION, variables);
// }

export {
    getProducts,
    getSlugs,
    getProduct,
    getOrder,
    // signInMutation,
    // signOutMutation,
    // signUpMutation,
    // resetPasswordRequestMutation,
    // resetPasswordMutation,
};
