import React from 'react';
import useForm from '@edudoor/ui/hooks/useForm';
import { ChooseStudentFormState } from '../../Forms/ChooseStudentForm';
import Modal, { ModalProps } from '@edudoor/ui/components/Modal';
import ChooseCourseManagerForm from '../../Forms/ChooseCourseManagerForm';
import { User } from '@edudoor/common/models/User';

const ChooseCourseManagerModal: React.FunctionComponent<ChooseCourseManagerModalProps> = (props): JSX.Element => {
  const form = useForm<ChooseStudentFormState>();
  return (
    <Modal {...props}>
      <Modal.Header title="Add course manager" />
      <Modal.Body>
        <ChooseCourseManagerForm
          form={form}
          managers={props.managers}
          courseId={props.courseId}
          onSuccess={props.onSuccess}
        />
      </Modal.Body>
      <Modal.Footer
        buttons={{ positive: 'Save' }}
        onPositiveClick={() => {
          form.formikProps.submitForm();
        }}
      />
    </Modal>
  );
};

export interface ChooseCourseManagerModalProps extends ModalProps {
  courseId: string;
  onSuccess: () => void;
  managers: Array<User>;
}

export default ChooseCourseManagerModal;
