import { MutableRefObject, useState } from 'react';
import useStateRef from './useStateRef';

const useModal = (defaultState?: boolean): UseModal => {
  const [open, setOpen, openRef] = useStateRef(defaultState || false);

  return {
    isOpen: open,
    isOpenRef: openRef,
    openModal: (): void => setOpen(true),
    closeModal: (): void => setOpen(false),
  };
};

export type UseModal = {
  isOpen: boolean;
  isOpenRef?: MutableRefObject<boolean>;
  openModal: () => void;
  closeModal: () => void;
};

export default useModal;
