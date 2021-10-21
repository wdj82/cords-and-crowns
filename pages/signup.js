import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/router';

import { signUpMutation } from '../util/gqlUtil';
import useForm from '../util/useForm';

function SignUpPage() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    });

    const mutation = useMutation(signUpMutation, {
        onSuccess: (data) => {
            console.log(data);
            queryClient.setQueryData('user', {
                authenticatedItem: data.createUser,
            });
            router.push('/account');
            // if (data.authenticateUserWithPassword.message) {
            //     setFailureMessage(data.authenticateUserWithPassword.message);
            // } else {
            //     queryClient.setQueryData('user', {
            //         authenticatedItem: data.authenticateUserWithPassword.item,
            //     });
            // }
        },
    });

    function handleSubmit(e) {
        e.preventDefault();
        try {
            mutation.mutate(inputs);
        } catch (error) {
            console.error('was an error');
        }
        resetForm();
    }

    return (
        <form method='POST' onSubmit={handleSubmit}>
            {mutation.isLoading && <div>Loading...</div>}
            {mutation.isError && <div>Error creating new account</div>}
            <h2>Create a new account</h2>
            <fieldset>
                <label htmlFor='email'>
                    Email
                    <input
                        type='email'
                        name='email'
                        placeholder='Your Email Address'
                        autoComplete='email'
                        value={inputs.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor='password'>
                    Password (min 8 characters)
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        autoComplete='password'
                        value={inputs.password}
                        onChange={handleChange}
                        required
                        minLength='8'
                    />
                </label>
                <button type='submit'>Sign Up</button>
            </fieldset>
        </form>
    );
}

export default SignUpPage;
