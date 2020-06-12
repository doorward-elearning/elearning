import { MutableRefObject, useEffect } from 'react';
import useStateRef from './useStateRef';

const useModal = (defaultState?: boolean): UseModal => {
  const [open, setOpen, openRef] = useStateRef(defaultState || false);
  let onClose: any = null;

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
      if (onClose) {
        onClose(...args);
      }
    },
    onClose: (listener: () => void): void => {
      onClose = listener;
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
