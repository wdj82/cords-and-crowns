import Link from 'next/link';
import { useQuery } from 'react-query';

import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import { getCurrentUser } from '../util/gqlUtil';

function AccountPage() {
    const { data, error, isLoading } = useQuery('user', () => getCurrentUser(), {
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data?.authenticatedItem) {
        return (
            <div>
                <SignIn />
                <h2>Don&apos;t have an account?</h2>
                <Link href='/signup'>Sign Up</Link>
            </div>
        );
    }
    return <SignOut />;
}

export default AccountPage;
