import { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import NProgress from 'nprogress';
import Router from 'next/router';
// import { SessionProvider } from 'next-auth/react';

import GlobalStyles from '../components/GlobalStyles';
import Page from '../components/Page';
import { CartContext, useCartState } from '../hooks/useCart';

import '../util/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
                    },
                },
            }),
    );

    const cart = useCartState();

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <GlobalStyles />
                {/* <SessionProvider session={pageProps.session}> */}
                <CartContext.Provider value={cart}>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </CartContext.Provider>
                <ReactQueryDevtools />
                {/* </SessionProvider> */}
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
