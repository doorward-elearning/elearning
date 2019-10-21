import { RefObject, useEffect, useRef } from 'react';
import { UseModal } from './useModal';

const useModalBlur = (useModal: UseModal): RefObject<HTMLDivElement> => {
  const modal = useRef(null);

  useEffect(() => {
    const modalBox: HTMLElement | null = document.querySelector('#modal-box');
    if (modalBox) {
      modalBox.childNodes.forEach(child => modalBox.removeChild(child));
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      if (modal.current) modalBox.appendChild(modal.current);
    }
  }, [modal]);
  useEffect(() => {
    const root: HTMLElement | null = document.querySelector('#root');
    if (root) {
      if (useModal.isOpen) {
        root.style.filter = 'blur(5px)';
      } else {
        root.style.filter = '';
      }
    }
  }, [modal, useModal.isOpen]);

  return modal;
};

export default useModalBlur;
