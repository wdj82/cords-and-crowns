import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';

import GlobalStyles from '../components/GlobalStyles';
import Page from '../components/Page';
import withData from '../util/withData';

import '../util/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
    return (
        <ApolloProvider client={apollo}>
            <GlobalStyles />
            <Page>
                <Component {...pageProps} />
            </Page>
        </ApolloProvider>
    );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
};

export default withData(MyApp);
