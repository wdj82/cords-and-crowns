import styled from 'styled-components';

import SHOES from '../data';
import ProductCard from './ProductCard';

function ProductGrid() {
    return (
        <Wrapper>
            {SHOES.map((shoe) => (
                <div key={shoe.slug}>
                    <ProductCard {...shoe} />
                </div>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
`;

export default ProductGrid;
