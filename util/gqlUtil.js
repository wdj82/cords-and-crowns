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
