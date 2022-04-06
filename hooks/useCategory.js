import { createContext, useState, useContext } from 'react';

const CategoryContext = createContext();

function useCategoryState() {
    const [category, setCategory] = useState('All Products');

    function changeCategory(newCategory) {
        setCategory(newCategory);
    }

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
