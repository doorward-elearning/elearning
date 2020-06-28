import React, { useState } from 'react';
import ChooseStudentForm, { ChooseStudentFormState, ChooseStudentGroupFormState } from '../../Forms/ChooseStudentForm';
import useForm from '@edudoor/ui/hooks/useForm';
import Modal, { ModalProps } from '@edudoor/ui/components/Modal';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { NavBarSearchContext } from '@edudoor/ui/components/NavBar/NavBarSearch';

const ChooseStudentModal: React.FunctionComponent<ChooseStudentModalProps> = props => {
  const [selected, setSelected] = useState(0);
  const form = useForm<ChooseStudentFormState>();
  const groupForm = useForm<ChooseStudentGroupFormState>();
  const state = useSelector((state: State) => state.courses.registerStudents);
  const [searchText, setSearchText] = useState('');

  return (
    <NavBarSearchContext searchText={searchText}>
      <Modal {...props}>
        <Modal.Header title="Add Student to course" onSearch={setSearchText} />
        <Modal.Body>
          <ChooseStudentForm
            onTabChange={setSelected}
            form={form}
            courseId={props.courseId}
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

export interface ChooseStudentModalProps extends ModalProps {
  courseId: string;
  onSuccess: () => void;
}

export default ChooseStudentModal;
