import { useState } from 'react';

function useForm(initial = {}) {
    const [inputs, setInputs] = useState(initial);

    function handleChange(e) {
        let { value } = e.target;
        if (e.target.type === 'number') {
            value = Number(value);
        }
        setInputs({
            ...inputs,
            [e.target.name]: value,
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    return {
        inputs,
        handleChange,
        resetForm,
    };
}

export default useForm;
