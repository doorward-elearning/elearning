import React from 'react';
import useModal, { UseModal } from '../../../hooks/useModal';
import Modal, { ModalFeatures } from '../Modal';

const ConfirmModal: React.FunctionComponent<ConfirmModalProps> = props => {
  const modal = props.useModal || useModal(false);

  const onClick = () => {
    modal.openModal();
  };

  const children = props.children instanceof Array ? (props.children as Array<any>)[1] : props.children;

  return (
    <React.Fragment>
      {props.children instanceof Array ? (props.children as Array<any>)[0](onClick) : null}
      <Modal useModal={modal} features={[ModalFeatures.NEGATIVE_BUTTON, ModalFeatures.POSITIVE_BUTTON]}>
        <Modal.Header title={props.title}>{props.header}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer
          props={{
            positive: {
              loading: props.loading,
              disabled: props.buttonDisabled,
            },
          }}
          onPositiveClick={() => {
            props.onConfirm();
            if (!props.keepOpen) {
              modal.closeModal();
            }
          }}
          onNegativeClick={() => {
            modal.closeModal();
            props.onReject && props.onReject();
          }}
        />
      </Modal>
    </React.Fragment>
  );
};

export interface ConfirmModalProps {
  children: JSX.Element | [(onClick: VoidFunction) => JSX.Element, JSX.Element];
  header?: JSX.Element;
  title?: string;
  onConfirm: VoidFunction;
  onReject?: VoidFunction;
  loading?: boolean;
  buttonDisabled?: boolean;
  useModal?: UseModal;
  keepOpen?: boolean;
}

export default ConfirmModal;
