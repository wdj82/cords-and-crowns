import { useState, createContext, useContext, useEffect } from 'react';

export const CartContext = createContext();

export function useCartState() {
    const [cart, setCart] = useState(() => {
        // if saved data in local storage load into cart
        if (typeof window !== 'undefined') {
            const valueInLocalStorage = window.localStorage.getItem('cart');
            if (valueInLocalStorage) {
                return JSON.parse(valueInLocalStorage);
            }
        }
        return {};
    });

    function addToCart({ slug, name, price, image }) {
        if (!cart[slug]) {
            const newCart = { ...cart };
            newCart[slug] = {
                slug,
                name,
                price,
                image: image.url,
            };
            setCart(newCart);
        }
    }

    function removeFromCart(name) {
        const newCart = { ...cart };
        delete newCart[name];
        setCart(newCart);
    }

    // save the cart to local storage whenever it's changed
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return { cart, setCart, addToCart, removeFromCart };
}

export function useCart() {
    return useContext(CartContext);
}
