import React, { useEffect } from 'react';
import Modal, { ModalProps } from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import './ProgressModal.scss';
import { WebComponentState } from '../../../../reducers/reducers';
import { ActionCreator } from 'redux';
import useAction from '../../../../hooks/useActions';
import useFormSubmit from '../../../../hooks/useFormSubmit';

const ProgressModal: React.FunctionComponent<ProgressModalProps> = props => {
  const action = useAction(props.action);

  useEffect(() => {
    if (props.useModal.isOpen) {
      action(props.args);
    }
  }, [props.useModal.isOpen]);

  useFormSubmit(props.state, () => {
    if (props.state.fetched) {
      props.useModal.closeModal();
      props.onSuccess && props.onSuccess(props.state.data);
    } else if (props.state.errors.message || props.state.errors.errors) {
      props.useModal.closeModal();
      props.onError && props.onError(props.state.errors);
    }
  });

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
  args?: Array<any>;
  onSuccess?: (data: any) => void;
  onError?: (errors: any) => void;
}

export default ProgressModal;
