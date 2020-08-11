import React from 'react';
import useForm from '@doorward/ui/hooks/useForm';
import { ChooseMemberFormState } from '../../Forms/ChooseMemberForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import ChooseConferenceManagerForm from '../../Forms/ChooseConferenceManagerForm';
import { User } from '@doorward/common/models/User';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import { ModeratorListResponse } from '../../../services/models/responseBody';

const ChooseConferenceManagerModal: React.FunctionComponent<ChooseConferenceManagerModalProps> = (props): JSX.Element => {
  const form = useForm<ChooseMemberFormState>();
  const state = useSelector((state: State) => state.conferences.createConferenceManager);
  return (
    <Modal {...props}>
      <Modal.Header title="Add conference manager" />
      <Modal.Body>
        <ChooseConferenceManagerForm
          form={form}
          managers={props.managers}
          conferenceId={props.conferenceId}
          onSuccess={props.onSuccess}
        />
      </Modal.Body>
      <Modal.Footer
        buttons={{ positive: 'Save' }}
        props={{
          positive: {
            loading: state.submitting,
          },
        }}
        onPositiveClick={() => {
          form.formikProps.submitForm();
        }}
      />
    </Modal>
  );
};

export interface ChooseConferenceManagerModalProps extends ModalProps {
  conferenceId: string;
  onSuccess: () => void;
  managers: WebComponentState<ModeratorListResponse>;
}

export default ChooseConferenceManagerModal;
