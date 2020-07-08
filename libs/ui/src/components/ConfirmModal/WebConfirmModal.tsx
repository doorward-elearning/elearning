import React, { useEffect } from 'react';
import ConfirmModal, { ConfirmModalProps } from './index';
import useRequestModal, { UseRequestModalProps } from '../../hooks/useRequestModal';
import { UseModal } from '../../hooks/useModal';
import { Omit } from '@doorward/common/types';

const WebConfirmModal: React.FunctionComponent<Omit<WebConfirmModalProps, 'onConfirm'>> = props => {
  const modal = props.useModal;
  const { submit, loading } = useRequestModal({ ...props, useModal: modal });
  return (
    <ConfirmModal cancellable={!loading} keepOpen {...props} onConfirm={submit} loading={loading} useModal={modal}>
      {props.children}
    </ConfirmModal>
  );
};

export interface WebConfirmModalProps extends ConfirmModalProps, Omit<UseRequestModalProps, 'useModal'> {
  useModal: UseModal;
}

export default WebConfirmModal;
