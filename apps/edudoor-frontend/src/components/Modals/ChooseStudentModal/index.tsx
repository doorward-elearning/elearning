import React, { useState } from 'react';
import ChooseStudentForm, { ChooseStudentFormState, ChooseStudentGroupFormState } from '../../Forms/ChooseStudentForm';
import useForm from '@edudoor/ui/hooks/useForm';
import Modal, { ModalProps } from '@edudoor/ui/components/Modal';
import { useSelector } from 'react-redux';
import { State } from '../../../store';

const ChooseStudentModal: React.FunctionComponent<ChooseStudentModalProps> = props => {
  const [selected, setSelected] = useState(0);
  const form = useForm<ChooseStudentFormState>();
  const groupForm = useForm<ChooseStudentGroupFormState>();
  const state = useSelector((state: State) => state.courses.registerStudents);

  return (
    <Modal {...props}>
      <Modal.Header title="Add Student to course" />
      <Modal.Body>
        <ChooseStudentForm
          onTabChange={setSelected}
          form={form}
          courseId={props.courseId}
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
  );
};

export interface ChooseStudentModalProps extends ModalProps {
  courseId: string;
  onSuccess: () => void;
}

export default ChooseStudentModal;
