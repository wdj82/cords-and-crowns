import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import formatMoney from '../util/formatMoney';
import { QUERIES } from '../util/constants';

function ProductCard({ name, price, slug, images, available }) {
    return (
        <Link href={`/product/${slug}`} passHref>
            <Anchor>
                <Wrapper>
                    <ImageWrapper>
                        <ProductImage src={images[0]?.url} alt={name} width={500} height={375} />
                    </ImageWrapper>
                    <Row>
                        <p>{name}</p>
                        {available ? <p>{formatMoney(price)}</p> : <SoldOut>Sold Out</SoldOut>}
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

    @media ${QUERIES.phone} {
        padding: 24px 32px;
    }
`;

const ImageWrapper = styled.div`
    border-radius: 16px 16px 8px 8px;
    /*
        Image zooms in on hover/focus,
        hide the spillover
    */
    overflow: hidden;

    /*
        NextJS workout for image's inline extra spacing
    */
    font-size: 0;
    word-spacing: 0;
    letter-spacing: 0;
`;

const ProductImage = styled(Image)`
    transition: transform 400ms;
    will-change: transform;

    ${Anchor}:hover &,
    ${Anchor}:focus & and (prefers-reduced-motion: no-preference) {
        transform: scale(1.1);
        transition: transform 200ms;
    }
`;

const SoldOut = styled.span`
    color: red;
`;

const Row = styled.div`
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
`;

export default ProductCard;
