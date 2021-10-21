import { useQueryClient, useMutation } from 'react-query';

import { signOutMutation } from '../util/gqlUtil';

function SignOut() {
    const queryClient = useQueryClient();

    const mutation = useMutation(signOutMutation, {
        onSuccess: (data) => {
            if (data.endSession) {
                queryClient.setQueryData('user', {
                    authenticatedItem: null,
                });
            }
        },
    });

    return (
        <button type='button' onClick={() => mutation.mutate()}>
            Sign Out
        </button>
    );
}

export default SignOut;
