import React, { useEffect } from 'react';
import './ProgressModal.scss';
import { ActionCreator } from 'redux';
import useRequestModal from '@doorward/ui/hooks/useRequestModal';
import Spinner from '@doorward/ui/components/Spinner';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { WebComponentState } from '@doorward/api-actions/types';

const ProgressModal: React.FunctionComponent<ProgressModalProps> = (props) => {
  const { submit } = useRequestModal(props);

  useEffect(() => {
    if (props.useModal.isOpen) {
      submit();
    }
  }, [props.useModal.isOpen]);
  return (
    <Modal {...props}>
      <Modal.Header title={props.title} />
      <Modal.Body>
        <div className="progress-modal">
          <Spinner />
          <p>{props.message}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export interface ProgressModalProps extends ModalProps {
  title: string;
  message?: string;
  state: WebComponentState<any>;
  action: ActionCreator<any>;
  onSuccess?: (data: any) => void;
  onError?: (errors: any) => void;
  showErrorToast?: boolean;
}

export default ProgressModal;
