import { MutableRefObject, useEffect } from 'react';

const useHeightTransition = (
  element: MutableRefObject<HTMLElement | null> | null,
  open: boolean,
  deps: Array<any>,
  timeout = 500
): void => {
  const observer = new MutationObserver(mutations => {
    const el: any = mutations[0].target;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const event = new CustomEvent('resize', { detail: { width: w, height: h } });
    if (element && element.current) {
      element.current.dispatchEvent(event);
    }
  });

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

  if (element && element.current) {
    observer.observe(element.current, {
      attributes: true,
      attributeOldValue: true,
      subtree: true,
      childList: true,
    });
    element.current.addEventListener('resize', () => {
      if (open && element.current) {
        setTimeout(() => {
          if (element.current && element.current.scrollHeight !== 0) {
            element.current.style.maxHeight = element.current.scrollHeight + 'px';
          }
        }, 500);
      }
    });
  }

  useEffect(modifyHeight, deps);

  useEffect(() => {
    setTimeout(modifyHeight, 10);
  }, [element]);
};

export default useHeightTransition;
