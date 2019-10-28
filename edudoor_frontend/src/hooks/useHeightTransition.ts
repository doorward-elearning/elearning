import { MutableRefObject, useEffect } from 'react';

const useHeightTransition = (
  element: MutableRefObject<HTMLElement | null> | null,
  open: boolean,
  deps: Array<any>,
  timeout = 500
): void => {
  const modifyHeight = (): void => {
    if (element) {
      const { current } = element;
      if (current) {
        if (open) {
          current.style.display = 'block';
          current.style.opacity = '1';
          current.style.maxHeight = current.scrollHeight + 'px';
        } else {
          setTimeout(() => {
            current.style.display = 'none';
          }, timeout);
          current.style.maxHeight = '0';
          current.style.opacity = '0';
        }
      }
    }
  };

  useEffect(modifyHeight, deps);

  useEffect(() => {
    setTimeout(modifyHeight, 10);
  }, [element]);
};

export default useHeightTransition;
