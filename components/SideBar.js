import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useCategory } from '../hooks/useCategory';
import getAllCategories from '../lib/getAllCategories';
import UnstyledButton from './UnstyledButton';

// media queries

function SideBar() {
    const router = useRouter();
    const { category, changeCategory } = useCategory();
    const { data, error, isLoading } = useQuery('categories', () => getAllCategories());

    //  TODO: Make loading component
    if (isLoading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    const categories = data?.categories;

    function handleClick(newCategory) {
        if (router.pathname !== '/') {
            router.push('/');
        }
        changeCategory(newCategory);
    }

    return (
        <CategoryList>
            <CategoryItem isCurrent={category === 'All Products'}>
                <UnstyledButton onClick={() => handleClick('All Products')}>All Products</UnstyledButton>
            </CategoryItem>
            {categories.map((categoryInfo) => (
                <CategoryItem key={categoryInfo.name} isCurrent={categoryInfo.name === category}>
                    <UnstyledButton onClick={() => handleClick(categoryInfo.name)}>{categoryInfo.name}</UnstyledButton>
                </CategoryItem>
            ))}
        </CategoryList>
    );
}

const CategoryList = styled.ul`
    padding: 16px;
`;

const CategoryItem = styled.li`
    color: ${(p) => (p.isCurrent ? 'red' : 'black')};

    margin-top: 8px;
    &:hover {
        background: var(--gray-100);
    }
`;

export default SideBar;
