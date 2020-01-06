import { useRef } from 'react';
import _ from 'lodash';
import useStateRef from './useStateRef';

export interface UseAccordion {
  open: boolean;
  toggle: () => void;
}
const useAccordion = (initialState: boolean): UseAccordion => {
  const [open, setOpen, openRef] = useStateRef(initialState);

  const throttledOpen = useRef(_.throttle(() => setOpen(!openRef.current), 500));

  return {
    open,
    toggle: throttledOpen.current,
  };
};

export default useAccordion;
