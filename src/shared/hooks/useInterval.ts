import React, { useEffect, useRef } from 'react';

// @ts-ignore
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.

  // eslint-disable-next-line
  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      // eslint-disable-next-line
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
