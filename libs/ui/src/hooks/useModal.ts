import { MutableRefObject, useEffect } from 'react';
import useStateRef from './useStateRef';

const useModal = (defaultState?: boolean): UseModal => {
  const [open, setOpen, openRef] = useStateRef(defaultState || false);
  const onClose: Array<(...args: Array<any>) => any> = [];

  useEffect(() => {
    setOpen(defaultState);
  }, [defaultState]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return {
    isOpen: open,
    isOpenRef: openRef,
    openModal: (): void => setOpen(true),
    closeModal: (...args: any[]): void => {
      setOpen(false);
      onClose.forEach(func => {
        func(...args);
      });
    },
    onClose: (listener: () => void): void => {
      onClose.push(listener);
    },
  };
};

export interface UseModal {
  isOpen: boolean;
  isOpenRef?: MutableRefObject<boolean>;
  openModal: () => void;
  closeModal: (...args: any[]) => void;
  onClose: (listener: (...args: any[]) => void) => void;
}

export default useModal;
