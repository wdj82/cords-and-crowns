import styled from 'styled-components';
import { Search, ShoppingCart, ChevronDown, User, X } from 'react-feather';

const icons = {
    search: Search,
    'shopping-cart': ShoppingCart,
    user: User,
    'chevron-down': ChevronDown,
    close: X,
};

function Icon({ id, size, strokeWidth = 1, ...delegated }) {
    const Component = icons[id];
    if (!Component) {
        throw new Error(`no icon found for ID: ${id}`);
    }

    return (
        <Wrapper strokeWidth={strokeWidth} {...delegated}>
            <Component size={size} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    & > svg {
        display: block;
        stroke-width: ${(p) => (p.strokeWidth !== undefined ? `${p.strokeWidth}px` : undefined)};
    }
`;

export default Icon;
