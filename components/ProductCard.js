import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import formatMoney from '../util/formatMoney';

function ProductCard({ name, price, slug, images, available }) {
    return (
        <Link href={`/product/${slug}`}>
            <Wrapper>
                <ProductImage src={images[0]?.url} alt={name} width={500} height={375} />
                <Row>
                    <p>{name}</p>
                    {available ? <p>{formatMoney(price)}</p> : <p>Sold Out</p>}
                </Row>
            </Wrapper>
        </Link>
    );
}

const Wrapper = styled.article`
    cursor: pointer;
`;

const ProductImage = styled(Image)`
    border-radius: 16px 16px 4px 4px;
    display: block;
    width: 100%;
    cursor: pointer;
`;

const Row = styled.div`
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
`;

export default ProductCard;
