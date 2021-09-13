import styled from 'styled-components';

import VisuallyHidden from './VisuallyHidden';
import Icon from './Icon';

function SearchInput() {
    return (
        <Label>
            <VisuallyHidden>Search</VisuallyHidden>
            <TextInput placeholder='Search...' />
            <SearchIcon id='search' size={24} />
        </Label>
    );
}

const Label = styled.label`
    display: block;
    position: relative;
    color: var(--gray-700);

    &:hover {
        color: var(--black);
    }
`;

const TextInput = styled.input`
    background: transparent;
    height: 2.25rem;
    font-size: 0.875rem;
    border: none;
    border-bottom: 2px solid var(--black);
    padding-left: 2.25rem;
    outline-offset: 2px;
    color: inherit;
    font-weight: var(--medium);

    &::placeholder {
        font-weight: var(--normal);
        color: var(--gray-500);
    }
`;

const SearchIcon = styled(Icon)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 24px;
    height: 24px;
`;

export default SearchInput;
