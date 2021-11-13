import { useState, createContext, useContext, useEffect } from 'react';

export const CartContext = createContext();

export function useCartState() {
    const [{ cart = {}, total = 0 }, setCart] = useState(() => {
        // if saved data in local storage load into cart
        if (typeof window !== 'undefined') {
            const valueInLocalStorage = window.localStorage.getItem('cart');
            if (valueInLocalStorage) {
                const parsedCart = JSON.parse(valueInLocalStorage);
                let savedTotal = 0;
                if (Object.keys(parsedCart).length > 0) {
                    savedTotal = Object.values(parsedCart).reduce((acc, curr) => acc + curr.price, 0);
                }
                return { cart: parsedCart, total: savedTotal };
            }
        }
        return {};
    });

    function addToCart({ slug, name, price, image }) {
        if (!cart[slug]) {
            setCart({
                cart: { ...cart, [slug]: { slug, name, price, image: image.url } },
                total: total + price,
            });
        }
    }

    function removeFromCart(name) {
        const newCart = { ...cart };
        delete newCart[name];
        setCart({
            cart: newCart,
            total: total - cart[name].price,
        });
    }

    function clearCart() {
        setCart({});
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
