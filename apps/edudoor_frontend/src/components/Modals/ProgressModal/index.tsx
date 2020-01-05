import React, { useEffect } from 'react';
import Modal, { ModalProps } from '@edudoor/ui/components/Modal';
import Spinner from '@edudoor/ui/components/Spinner';
import './ProgressModal.scss';
import { WebComponentState } from '../../../../reducers/reducers';
import { ActionCreator } from 'redux';
import useRequestModal from '../../../../hooks/useRequestModal';

const ProgressModal: React.FunctionComponent<ProgressModalProps> = props => {
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
