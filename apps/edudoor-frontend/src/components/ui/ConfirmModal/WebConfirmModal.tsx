import React from 'react';
import ConfirmModal, { ConfirmModalProps } from './index';
import useRequestModal, { UseRequestModalProps } from '../../../hooks/useRequestModal';
import useModal, { UseModal } from '../../../hooks/useModal';

const WebConfirmModal: React.FunctionComponent<Omit<WebConfirmModalProps, 'onConfirm'>> = props => {
  const modal = props.useModal || useModal(false);
  const { submit, loading } = useRequestModal({ ...props, useModal: modal });
  return (
    <ConfirmModal keepOpen {...props} onConfirm={submit} loading={loading} useModal={modal}>
      {props.children}
    </ConfirmModal>
  );
};

export interface WebConfirmModalProps extends ConfirmModalProps, Omit<UseRequestModalProps, 'useModal'> {
  useModal?: UseModal;
}

export default WebConfirmModal;
