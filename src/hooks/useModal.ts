import { MutableRefObject, useState } from 'react';
import useStateRef from './useStateRef';

const useModal = (defaultState?: boolean): UseModal => {
  const [open, setOpen, openRef] = useStateRef(defaultState || false);
  let onClose: any = null;

  return {
    isOpen: open,
    isOpenRef: openRef,
    openModal: (): void => setOpen(true),
    closeModal: (): void => {
      setOpen(false);
      if (onClose) {
        onClose();
      }
    },
    onClose: (listener: () => void): void => {
      onClose = listener;
    },
  };
};

export type UseModal = {
  isOpen: boolean;
  isOpenRef?: MutableRefObject<boolean>;
  openModal: () => void;
  closeModal: () => void;
  onClose: (listener: () => void) => void;
};

export default useModal;