import NProgress from 'nprogress';
import Router from 'next/router';

import GlobalStyles from '../components/GlobalStyles';
import Page from '../components/Page';

// import 'nprogress/nprogress.css';
import '../util/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyles />
            <Page>
                <Component {...pageProps} />
            </Page>
        </>
    );
}

export default MyApp;
