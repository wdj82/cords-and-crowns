import Link from 'next/link';
import styled from 'styled-components';

import formatMoney from '../util/formatMoney';

function ProductCard({ id, name, photo, price }) {
    return (
        <Link href={`/product/${id}`}>
            <Wrapper>
                <Image src={photo[0]?.image?.publicUrlTransformed} alt={photo[0]?.altText} />
                <Row>
                    <p>{name}</p>
                    <p>{formatMoney(price)}</p>
                </Row>
            </Wrapper>
        </Link>
    );
}

const Wrapper = styled.article`
    cursor: pointer;
`;

const Image = styled.img`
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
