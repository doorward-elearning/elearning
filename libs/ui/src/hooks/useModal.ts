import { MutableRefObject, useEffect, useRef } from 'react';
import useStateRef from './useStateRef';

const useModal = (open?: boolean, listener?: Function): UseModal => {
  const [_open, setOpen, openRef] = useStateRef(open || false);
  const onClose = useRef(listener);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = _open ? 'hidden' : 'auto';
  }, [_open]);

  return {
    isOpen: _open,
    isOpenRef: openRef,
    openModal: (): void => setOpen(true),
    closeModal: (...args: any[]): void => {
      setOpen(false);
      if (onClose.current) {
        onClose.current(...args);
      }
    },
    onClose: (listener: () => void): void => {
      onClose.current = listener;
    },
    removeCloseListener: () => {
      onClose.current = null;
    },
  };
};

export interface UseModal {
  isOpen: boolean;
  isOpenRef?: MutableRefObject<boolean>;
  openModal: () => void;
  closeModal: (...args: any[]) => void;
  onClose: (listener: (...args: any[]) => void) => void;
  removeCloseListener: () => void;
}

export default useModal;
