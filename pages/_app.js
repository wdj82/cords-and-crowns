// import { ApolloProvider } from '@apollo/client';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import NProgress from 'nprogress';
import Router from 'next/router';

import GlobalStyles from '../components/GlobalStyles';
import Page from '../components/Page';
// import withData from '../util/withData';

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

    return (
        // <ApolloProvider client={apollo}>
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <GlobalStyles />
                <Page>
                    <Component {...pageProps} />
                </Page>
                <ReactQueryDevtools />
            </Hydrate>
        </QueryClientProvider>
        // </ApolloProvider>
    );
}

// MyApp.getInitialProps = async ({ Component, ctx }) => {
//     let pageProps = {};
//     if (Component.getInitialProps) {
//         pageProps = await Component.getInitialProps(ctx);
//     }
//     pageProps.query = ctx.query;
//     return { pageProps };
// };

export default MyApp;

// export default withData(MyApp);
