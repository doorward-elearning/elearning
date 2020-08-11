import React from 'react';
import useForm from '@doorward/ui/hooks/useForm';
import { ChooseMemberFormState } from '../../Forms/ChooseMemberForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import ChooseForumManagerForm from '../../Forms/ChooseForumManagerForm';
import { User } from '@doorward/common/models/User';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import { ModeratorListResponse } from '../../../services/models/responseBody';

const ChooseForumManagerModal: React.FunctionComponent<ChooseForumManagerModalProps> = (props): JSX.Element => {
  const form = useForm<ChooseMemberFormState>();
  const state = useSelector((state: State) => state.forums.createForumManager);
  return (
    <Modal {...props}>
      <Modal.Header title="Add forum manager" />
      <Modal.Body>
        <ChooseForumManagerForm
          form={form}
          managers={props.managers}
          forumId={props.forumId}
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

export interface ChooseForumManagerModalProps extends ModalProps {
  forumId: string;
  onSuccess: () => void;
  managers: WebComponentState<ModeratorListResponse>;
}

export default ChooseForumManagerModal;
