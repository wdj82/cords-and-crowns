import { useQuery } from 'react-query';
import { useCategory } from '../hooks/useCategory';
import getAllCategories from '../lib/getAllCategories';
import UnstyledButton from './UnstyledButton';

// TODO: highlight current category
// hover effect for each one
// styling
// media queries
// move category desc into ProductGrid

function SideBar() {
    const [currentCategory, setCurrentCategory] = useCategory();
    // console.log(currentCategory);
    const { data, error, isLoading } = useQuery('categories', () => getAllCategories());

    //  TODO: Make loading component
    if (isLoading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    const categories = data?.categories;

    return (
        <ul>
            <li>
                <UnstyledButton onClick={() => setCurrentCategory('All Products')}>All Products</UnstyledButton>
            </li>
            {categories.map((category) => (
                <li key={category.name}>
                    <UnstyledButton onClick={() => setCurrentCategory(category.name)}>{category.name}</UnstyledButton>
                </li>
            ))}
        </ul>
    );
}

export default SideBar;
