import styled from 'styled-components';

function formatePrice(price) {
    return `$${price / 100}`;
}

function ProductCard({ name, imageSrc, price }) {
    return (
        <article>
            <Image src={imageSrc} alt='' />
            <Row>
                <p>{name}</p>
                <p>{formatePrice(price)}</p>
            </Row>
        </article>
    );
}

const Image = styled.img`
    border-radius: 16px 16px 4px 4px;
    display: block;
    width: 100%;
`;

const Row = styled.div`
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
`;

export default ProductCard;
