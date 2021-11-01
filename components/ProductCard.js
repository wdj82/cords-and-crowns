import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import formatMoney from '../util/formatMoney';

function ProductCard({ name, price, slug, images, available }) {
    return (
        <Link href={`/product/${slug}`} passHref>
            <Anchor>
                <Wrapper>
                    <ProductImage src={images[0]?.url} alt={name} width={500} height={375} />
                    <Row>
                        <p>{name}</p>
                        {available ? <p>{formatMoney(price)}</p> : <p>Sold Out</p>}
                    </Row>
                </Wrapper>
            </Anchor>
        </Link>
    );
}

const Anchor = styled.a`
    text-decoration: none;

    &:visited {
        color: inherit;
    }

    &:active {
        text-decoration: none;
    }

    &:link {
        color: inherit;
    }
`;

const Wrapper = styled.div`
    width: fit-content;
`;

const ProductImage = styled(Image)`
    border-radius: 16px 16px 4px 4px;
    cursor: pointer;
`;

const Row = styled.div`
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
`;

export default ProductCard;
