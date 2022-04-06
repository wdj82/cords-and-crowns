import { createContext, useState, useContext, useEffect } from 'react';

const CategoryContext = createContext();

function useCategoryState() {
    const [category, setCategory] = useState('All Products');

    function changeCategory(newCategory) {
        console.log('new category: ', newCategory);
        setCategory(newCategory);
    }

    useEffect(() => {
        console.log(category);
    }, [category]);

    return { category, changeCategory };
}

export function CategoryProvider({ children }) {
    const category = useCategoryState();

    return <CategoryContext.Provider value={category}>{children}</CategoryContext.Provider>;
}

export function useCategory() {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
}
