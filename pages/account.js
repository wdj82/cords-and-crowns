import { useQuery } from 'react-query';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
// import SignUp from '../components/SignUp';
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
        return <SignIn />;
    }
    return <SignOut />;
}

export default AccountPage;
