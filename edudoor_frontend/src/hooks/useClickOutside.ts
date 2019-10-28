import { MouseEventHandler, MutableRefObject, useEffect } from 'react';

const useClickOutside = (
  listener: MouseEventHandler<any>,
  element: MutableRefObject<HTMLElement | null>
): (() => void) => {
  const eventListener = (e: any): void => {
    if (element) {
      const current = element.current;
      if (current && current.contains && e.target && !current.contains(e.target)) {
        listener(e);
      }
    }
  };
  useEffect(() => {
    document.addEventListener('click', eventListener);
  }, [element]);

  return (): void => {
    document.removeEventListener('click', eventListener);
  };
};

export default useClickOutside;
