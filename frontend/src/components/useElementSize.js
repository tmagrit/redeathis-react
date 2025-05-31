import { useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

export function useElementSize(target) {
    const [size, setSize] = useState({
        width: 350,
        height: 350
    });

    useLayoutEffect(() => {   
        target && setSize(target.current.getBoundingClientRect());
    }, [target]);
  
    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect));

    return size;
};