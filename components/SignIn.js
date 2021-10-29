import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';

import { signInMutation } from '../util/gqlUtil';
import useForm from '../hooks/useForm';

function SignIn() {
    const queryClient = useQueryClient();

    const [failureMessage, setFailureMessage] = useState('');
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    });

    const mutation = useMutation(signInMutation, {
        onSuccess: (data) => {
            console.log(data);
            if (data.authenticateUserWithPassword.message) {
                setFailureMessage(data.authenticateUserWithPassword.message);
            } else {
                const cookie = `keystonejs-session=${data.authenticateUserWithPassword.sessionToken}`;
                console.log(cookie);
                document.cookie = cookie;
                queryClient.setQueryData('user', {
                    id: data.authenticateUserWithPassword.item.id,
                    email: data.authenticateUserWithPassword.item.email,
                });
            }
        },
    });

    function handleSubmit(e) {
        e.preventDefault();
        mutation.mutate(inputs);
        resetForm();
    }

    if (mutation.isError) {
        return <div>Error</div>;
    }

    return (
        <form method='POST' onSubmit={handleSubmit}>
            {mutation.isLoading && <div>Loading...</div>}
            {failureMessage && <div>Your email or your password was not correct</div>}
            <h2>Sign Into Your Account</h2>
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
                    />
                </label>
                <label htmlFor='password'>
                    Password
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        autoComplete='password'
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type='submit'>Sign In</button>
            </fieldset>
        </form>
    );
}

export default SignIn;
