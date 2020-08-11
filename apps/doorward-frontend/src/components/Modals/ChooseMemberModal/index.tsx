import React, { useState } from 'react';
import ChooseMemberForm, { ChooseMemberFormState, ChooseMemberGroupFormState } from '../../Forms/ChooseMemberForm';
import useForm from '@doorward/ui/hooks/useForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { NavBarSearchContext } from '@doorward/ui/components/NavBar/NavBarSearch';

const ChooseMemberModal: React.FunctionComponent<ChooseMemberModalProps> = props => {
  const [selected, setSelected] = useState(0);
  const form = useForm<ChooseMemberFormState>();
  const groupForm = useForm<ChooseMemberGroupFormState>();
  const state = useSelector((state: State) => state.forums.registerMembers);
  const [searchText, setSearchText] = useState('');

  return (
    <NavBarSearchContext searchText={searchText}>
      <Modal {...props}>
        <Modal.Header title="Add Member to forum" onSearch={setSearchText} />
        <Modal.Body>
          <ChooseMemberForm
            onTabChange={setSelected}
            form={form}
            forumId={props.forumId}
            search={searchText}
            onClearSearch={() => setSearchText('')}
            onSuccess={props.onSuccess}
            groupForm={groupForm}
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
            if (selected === 0 && form.formikProps) {
              form.formikProps.submitForm();
            } else if (selected === 1 && groupForm.formikProps) {
              groupForm.formikProps.submitForm();
            }
          }}
        />
      </Modal>
    </NavBarSearchContext>
  );
};

export interface ChooseMemberModalProps extends ModalProps {
  forumId: string;
  onSuccess: () => void;
}

export default ChooseMemberModal;
