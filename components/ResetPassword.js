// import { useState } from 'react';
// import { useMutation } from 'react-query';

// import { resetPasswordRequestMutation } from '../util/gqlUtil';
// import useForm from '../hooks/useForm';

// function ResetPassword() {
//     const [isEmailSent, setIsEmailSent] = useState(false);
//     const { inputs, handleChange } = useForm({
//         email: '',
//     });

//     const mutation = useMutation(resetPasswordRequestMutation);

//     function handleSubmit(e) {
//         e.preventDefault();
//         mutation.mutate(inputs);
//         setIsEmailSent(true);
//     }

//     if (mutation.isError) {
//         return <div>Server error - please try again</div>;
//     }

//     const resetForm = (
//         <div>
//             <form method='POST' onSubmit={handleSubmit}>
//                 {mutation.isLoading && <div>Loading...</div>}
//                 <h2>Reset your password</h2>
//                 <fieldset>
//                     <label htmlFor='email'>
//                         Email
//                         <input
//                             type='email'
//                             name='email'
//                             placeholder='Your Email Address'
//                             autoComplete='email'
//                             value={inputs.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                     <button type='submit'>Request Password Reset</button>
//                 </fieldset>
//             </form>
//         </div>
//     );

//     return <div>{isEmailSent ? <h2>Please check your email for a link</h2> : resetForm}</div>;
// }

// export default ResetPassword;
