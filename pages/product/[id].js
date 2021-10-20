import { dehydrate, QueryClient } from 'react-query';
import Head from 'next/head';
import Image from 'next/image';

import { getProduct, getProducts } from '../../util/gqlUtil';

function SingleProductPage({ dehydratedState }) {
    const { name, price, description, photo: photos } = dehydratedState.queries[0].state.data.Product;
    // const { id } = useRouter().query;

    return (
        <div>
            <Head>
                <title>Cords&amp;Crowns | {name}</title>
            </Head>
            <h1>{name}</h1>
            <p>{price}</p>
            <p>{description}</p>
            {photos.map((photo) => (
                <Image
                    key={photo.altText}
                    src={photo.image.publicUrlTransformed}
                    alt={photo.altText}
                    width={500}
                    height={375}
                />
            ))}
        </div>
    );
}

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['product', params.id], () => getProduct(params.id));
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export async function getStaticPaths() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery('products', () => getProducts());
    const data = queryClient.getQueryData('products');

    const paths = data?.allProducts.map((product) => ({
        params: { id: product.id },
    }));
    return { paths, fallback: false };
}

export default SingleProductPage;
