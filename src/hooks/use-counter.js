import { useState, useEffect } from 'react';

const useCounter = (defaultvalue = 0) => {
    const [counter, setCounter] = useState(defaultvalue);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 1000);

        return()=> clearInterval(interval);
    }, []);

    return counter;
};

export default useCounter;