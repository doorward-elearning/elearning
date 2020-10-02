import { MutableRefObject, useEffect } from 'react';

const modifyHeight = (element: MutableRefObject<HTMLElement | null> | null, open, timeout): void => {
  if (element) {
    const { current } = element;
    if (current) {
      if (open) {
        current.style.display = 'block';
        current.style.opacity = '1';
        current.style.maxHeight = current.scrollHeight + 100 + 'px';
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

const useHeightTransition = (
  element: MutableRefObject<HTMLElement | null> | null,
  open: boolean,
  deps: Array<any>,
  timeout = 500
): void => {
  useEffect(() => modifyHeight(element, open, timeout), deps);

  useEffect(() => {
    setTimeout(() => modifyHeight(element, open, timeout), 10);
  }, [element]);
};

export default useHeightTransition;
