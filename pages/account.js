// import Link from 'next/link';
// import { useState } from 'react';
// import { useQuery, useQueryClient } from 'react-query';

// import SignIn from '../components/SignIn';
// import SignOut from '../components/SignOut';
// import ResetPassword from '../components/ResetPassword';
// import { getCurrentUser } from '../util/gqlUtil';

// function AccountPage() {
//     const [showPasswordReset, setShowPasswordReset] = useState(false);

//     // const { data, error, isLoading } = useQuery('user', () => getCurrentUser(), {
//     //     cacheTime: Infinity,
//     //     staleTime: Infinity,
//     // });
//     // console.log(data);

//     // if (isLoading) {
//     //     return <div>Loading...</div>;
//     // }

//     // if (error) {
//     //     return <div>Error: {error}</div>;
//     // }

//     const queryClient = useQueryClient();
//     const data = queryClient.getQueryData('user');
//     console.log(data);

//     if (showPasswordReset) {
//         return (
//             <div>
//                 <ResetPassword />
//                 <button type='button' onClick={() => setShowPasswordReset(false)}>
//                     Sign In
//                 </button>
//                 <h2>Don&apos;t have an account?</h2>
//                 <Link href='/signup'>Sign Up</Link>
//             </div>
//         );
//     }

//     // no login info
//     if (!data?.authenticatedItem) {
//         return (
//             <div>
//                 <SignIn />
//                 <h2>Forgot your password?</h2>
//                 <button type='button' onClick={() => setShowPasswordReset(true)}>
//                     Reset Your Password
//                 </button>
//                 <h2>Don&apos;t have an account?</h2>
//                 <Link href='/signup'>Sign Up</Link>
//             </div>
//         );
//     }

//     // we're logged in just show sign out component
//     return <SignOut />;
// }

// export default AccountPage;
