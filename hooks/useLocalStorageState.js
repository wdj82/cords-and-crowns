import { useEffect, useState } from 'react';

function useLocalStorageState(key, defaultValue = []) {
    const [state, setState] = useState(() => {
        if (typeof window !== 'undefined') {
            console.log('getting cart');
            const valueInLocalStorage = window.localStorage.getItem(key);
            if (valueInLocalStorage) {
                return JSON.parse(valueInLocalStorage);
            }
        }
        return defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default useLocalStorageState;
