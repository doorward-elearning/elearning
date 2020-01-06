import { MouseEventHandler, MutableRefObject, useEffect } from 'react';

const useClickOutside = (listener: MouseEventHandler<any>, element: MutableRefObject<HTMLElement | null>) => {
  const eventListener = (e: any): void => {
    if (element) {
      const current = element.current;
      if (current && current.contains && e.target && !current.contains(e.target)) {
        listener(e);
      }
    }
  };

  useEffect(() => {
    if (element.current) {
      document.addEventListener('click', eventListener);
    }

    return (): void => {
      document.removeEventListener('click', eventListener);
    };
  }, [element]);
};

export default useClickOutside;
