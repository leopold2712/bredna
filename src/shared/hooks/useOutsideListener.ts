/**
 * Hook that alerts clicks outside of the passed ref
 */
import { Ref, useEffect } from 'react';

export const useOutsideListener = (ref: Ref<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: Event) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
