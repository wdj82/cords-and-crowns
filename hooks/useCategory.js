import { createContext, useState, useContext } from 'react';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [category, setCategory] = useState('All Products');
    return <CategoryContext.Provider value={[category, setCategory]}>{children}</CategoryContext.Provider>;
}

export function useCategory() {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
}
