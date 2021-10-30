// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { useMutation } from 'react-query';

// import ResetPassword from '../components/ResetPassword';
// import { resetPasswordMutation } from '../util/gqlUtil';
// import useForm from '../hooks/useForm';

// function ResetPage() {
//     const [isPasswordReset, setIsPasswordReset] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const router = useRouter();
//     const { token } = router.query;

//     const { inputs, handleChange } = useForm({
//         email: '',
//         password: '',
//     });

//     const mutation = useMutation(resetPasswordMutation, {
//         onSuccess: (data) => {
//             if (data.redeemUserPasswordResetToken?.code) {
//                 setErrorMessage('Error creating new password. Please try again.');
//             }
//         },
//     });

//     function handleSubmit(e) {
//         e.preventDefault();
//         mutation.mutate({ ...inputs, token });
//         setIsPasswordReset(true);
//     }

//     if (mutation.isError) {
//         return <div>Server error - please try again</div>;
//     }

//     if (!token || errorMessage) {
//         return (
//             <>
//                 <h2>{errorMessage}</h2>
//                 <ResetPassword />
//             </>
//         );
//     }

//     const resetForm = (
//         <form method='POST' onSubmit={handleSubmit}>
//             <h2>Enter New Password</h2>
//             <fieldset>
//                 <label htmlFor='email'>
//                     Email
//                     <input
//                         type='email'
//                         name='email'
//                         placeholder='Your Email Address'
//                         autoComplete='email'
//                         value={inputs.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label htmlFor='password'>
//                     Password (min 8 characters)
//                     <input
//                         type='password'
//                         name='password'
//                         placeholder='Password'
//                         autoComplete='password'
//                         value={inputs.password}
//                         onChange={handleChange}
//                         required
//                         minLength='8'
//                     />
//                 </label>
//                 <button type='submit'>Reset Password</button>
//             </fieldset>
//         </form>
//     );

//     return <div>{isPasswordReset ? <h2>You can now sign in with your new password</h2> : resetForm}</div>;
// }

// export default ResetPage;

function reset() {
    return <div>reset page</div>;
}

export default reset;
