import { MutableRefObject, useEffect } from 'react';

const useCaptureKeyDown = (
  element: MutableRefObject<HTMLElement>,
  handler: (e: KeyboardEvent) => any,
  args?: Array<any>
) => {
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener('keydown', handler);
    }

    return () => {
      if (element.current) {
        element.current.removeEventListener('keydown', handler);
      }
    };
  }, [element, ...(args || [])]);
};

export default useCaptureKeyDown;
