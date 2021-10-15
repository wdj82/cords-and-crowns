import { useQuery } from 'react-query';
import Head from 'next/head';
import Image from 'next/image';
import { decode } from 'blurhash';

import { getProduct } from '../util/gqlUtil';

function SingleProduct({ id }) {
    if (!id) {
        return <p>Loading...</p>;
    }

    const { data, error, isLoading } = useQuery(['product', id], () => getProduct(id));

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    const pixels = decode('LQN,;=j[_NtRRjfQWBfkx]j[IAae', 200, 200);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(200, 200);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    const blurDataURL = canvas.toDataURL();

    const { name, price, description, photo: photos } = data?.Product;

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
                    height={500}
                    placeholder='blur'
                    blurDataURL={blurDataURL}
                />
            ))}
        </div>
    );
}

export default SingleProduct;
