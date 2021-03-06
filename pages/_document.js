import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    // boilerplate code from styled-components to get it working with next.js
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Oleo+Script:wght@700&display=swap'
                        rel='stylesheet'
                    />
                    <link rel='shortcut icon' href='/images/favicon.ico' />
                    <meta
                        name='description'
                        content='Handmade Day of the Dead themed items including: Cords, Flower Crowns, Jewelry, Jewelry Displays, Paper-weights, Decorative Boxes, Teacher Themed Signs'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
