import React from 'react';
import useForm from '@doorward/ui/hooks/useForm';
import { ChooseStudentFormState } from '../../Forms/ChooseStudentForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import ChooseCourseManagerForm from '../../Forms/ChooseCourseManagerForm';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import { TeachersResponse } from '@doorward/common/dtos/response';

const ChooseCourseManagerModal: React.FunctionComponent<ChooseCourseManagerModalProps> = (props): JSX.Element => {
  const form = useForm<ChooseStudentFormState>();
  const state = useDoorwardApi((state) => state.courseManagers.createCourseManager);
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

export interface ChooseCourseManagerModalProps extends ModalProps {
  courseId: string;
  onSuccess: () => void;
  managers: WebComponentState<TeachersResponse>;
}

export default ChooseCourseManagerModal;
