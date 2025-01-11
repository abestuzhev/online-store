import { useState, useEffect } from 'react';
import { debounce, mobileDetect } from '@/helpers/functions';

function useWindowDimension() {
  const [dimension, setDimension] = useState([
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
  ]);

  // console.log("dimension", dimension)
  useEffect(() => {
    const debouncedResizeHandler = mobileDetect(navigator.userAgent)
      ? () =>
          setDimension([
            document.documentElement.clientWidth,
            document.documentElement.clientHeight,
          ])
      : debounce(() => {
          setDimension([
            document.documentElement.clientWidth,
            document.documentElement.clientHeight,
          ]);
        }, 100);

    window.addEventListener('resize', debouncedResizeHandler);
    return () => window.removeEventListener('resize', debouncedResizeHandler);
  }, [document.documentElement.clientWidth]); // Note this empty array. this effect should run only on mount and unmount

  return dimension;
}

export default useWindowDimension;
