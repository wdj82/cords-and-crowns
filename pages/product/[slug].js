import { dehydrate, QueryClient } from 'react-query';
import Head from 'next/head';
import Image from 'next/image';

import { getProduct, getSlugs } from '../../util/gqlUtil';

function SingleProductPage({ dehydratedState }) {
    const { name, price, description, images } = dehydratedState.queries[0].state.data.product;
    // const { id } = useRouter().query;

    return (
        <div>
            <Head>
                <title>Cords&amp;Crowns | {name}</title>
            </Head>
            <h1>{name}</h1>
            <p>{price}</p>
            <p>{description}</p>
            {images.map((image) => (
                <Image key={image.fileName} src={image.url} alt={name} width={500} height={375} />
            ))}
        </div>
    );
}

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['product', params.slug], () => getProduct(params.slug));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export async function getStaticPaths() {
    const queryClient = new QueryClient();
    const data = await queryClient.fetchQuery('slugs', () => getSlugs());

    const paths = data?.products.map((product) => ({
        params: { slug: product.slug },
    }));
    return { paths, fallback: false };
}

export default SingleProductPage;
