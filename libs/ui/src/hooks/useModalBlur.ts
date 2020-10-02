import { RefObject, useEffect, useRef, useState } from 'react';
import { UseModal } from './useModal';

const useModalBlur = (useModal: UseModal): RefObject<HTMLDivElement> => {
  const modal = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!useModal.isOpen) {
      setTimeout(() => {
        setVisible(false);
      }, 200);
    } else {
      setVisible(true);
    }
  }, [useModal.isOpen]);

  useEffect(() => {
    const modalBox: HTMLElement | null = document.querySelector('#modal-box');
    if (modalBox) {
      if (useModal.isOpen) {
        if (modal.current) modalBox.appendChild(modal.current);
      } else if (!visible) {
        modalBox.childNodes.forEach(child => {
          modalBox.removeChild(child);
        });
      }
    }
  }, [useModal.isOpen, visible]);

  // useEffect(() => {
  //   const root: HTMLElement | null = document.querySelector('#root');
  //   if (root) {
  //     if (useModal.isOpen) {
  //       root.style.filter = 'blur(5px)';
  //     } else {
  //       root.style.filter = '';
  //     }
  //   }
  // }, [modal, useModal.isOpen]);

  return modal;
};

export default useModalBlur;
