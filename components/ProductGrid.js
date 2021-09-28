import styled from 'styled-components';

import { SKULLS } from '../data';
import ProductCard from './ProductCard';

function ProductGrid() {
    return (
        <Wrapper>
            {SKULLS.map((skull) => (
                <div key={skull.name}>
                    <ProductCard {...skull} />
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
