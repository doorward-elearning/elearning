import { useEffect, useState } from 'react';

export enum TransitionStates {
  OPENING = 'opening',
  OPEN = 'open',
  CLOSING = 'closing',
  CLOSED = 'closed',
}

const useTransition = (duration: number, onClose?: () => void, onOpen?: () => void, startOpen = true) => {
  const [state, setState] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (state === TransitionStates.OPENING) {
        setState(TransitionStates.OPEN);
        if (onOpen) {
          onOpen();
        }
      }
      if (state === TransitionStates.CLOSING) {
        setState(TransitionStates.CLOSED);
        if (onClose) {
          onClose();
        }
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [state]);

  const open = () => {
    setState(TransitionStates.OPENING);
  };

  useEffect(() => {
    if (startOpen) {
      open();
    }
  }, []);

  const close = () => {
    setState(TransitionStates.CLOSING);
  };

  return { state, open, close };
};

export default useTransition;
