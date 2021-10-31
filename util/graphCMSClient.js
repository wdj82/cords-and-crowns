import { gql, GraphQLClient } from 'graphql-request';

const graphCMSClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT);
const graphCMSMutationClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzU2MDIwNzAsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2Nrdjl1dnNpYjEwMjIwMXoyNXZ4bzZqc3cvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNmJiOGMzZWEtYmUzMy00ZjA2LTgxZTQtZDVlMjNhNTI4N2E5IiwianRpIjoiY2t2ZHY4cXN6MXhtcTAxeG5jNmgxYXF4ciJ9.d3eD84qtaSkCbsRQOKK8ZwGaIuNohYYzXLErK5I6wE0sREDbSBlJxjeoOV-tly7so0qMap5v4glpK49gUYHISiUx9k-EYwLiq6D00y6jE8ub4Eiy6ZneZjl6aHcodcqhhFx-qOgrbH9YlGOqps7K_T8LM15N4NvWplWSwmcqjFGidsVz9Os_ZNifSsUZEPjPvbcjfZIHr167_M5ucUOyS7O-3WhPha7MOxNYhoPXKDySUUnlUIgaqzxSQcAMIwSs7t2M1662h52mQ9dFar3zSBHxmSxArxqlpg5gcxryHFHfW7IjhCgi_RYGMytoZl5uYyCYHgfsWct0Quazdm5X6YzLLaOnlKj_mU1DE_bkHzB0LtdOwAAnwv_Nc9Awf_-QNtuEN_KfL_RLLxfY29Ds6ORpFwZP1zR-eMJiaYrMp2SVzUzUgg3_1d_sRNf5L5U1MngKNQOkUCj51eEd-12lJRYFZURYQDfLSBRGeck7muBO4laQL5Ado-N_i7RfyQ_JhTfON0nobYkRTWx1yMEW4D3zAzDVJb6ldzYSWE2xOcPpAn80xhyZ_wpVpr1tluFuabA6BvvejndsfqgCggs-zCpu-c4sZJoJsY_7DFmq98OecRWaCntFGN41urZGhDF8HGEKuEWf27GvlAxPvtST8tM48d5xiKmvlADEGAa90rA`,
    },
});
const graphCMSOrdersClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_ORDERS_TOKEN}`,
    },
});

export { gql, graphCMSClient, graphCMSMutationClient, graphCMSOrdersClient };
