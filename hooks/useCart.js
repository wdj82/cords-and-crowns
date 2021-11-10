import { useState, createContext, useContext, useEffect } from 'react';

export const CartContext = createContext();

export function useCartState() {
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState(() => {
        // if saved data in local storage load into cart
        if (typeof window !== 'undefined') {
            const valueInLocalStorage = window.localStorage.getItem('cart');
            if (valueInLocalStorage) {
                const parsedCart = JSON.parse(valueInLocalStorage);
                if (Object.keys(parsedCart).length > 0) {
                    setTotal(Object.values(parsedCart).reduce((acc, curr) => acc + curr.price, 0));
                }
                return parsedCart;
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
            setTotal(total + price);
        }
    }

    function removeFromCart(name) {
        const newCart = { ...cart };
        delete newCart[name];
        setTotal(total - cart[name].price);
        setCart(newCart);
    }

    function clearCart() {
        setCart({});
        setTotal(0);
    }

    // save the cart to local storage whenever it's changed
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return { cart, total, clearCart, addToCart, removeFromCart };
}

export function useCart() {
    return useContext(CartContext);
}
