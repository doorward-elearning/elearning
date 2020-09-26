import React from 'react';
import { FormikActions } from 'formik';
import { AddCourseFormState } from '../../components/Forms/AddCourseForm';
import { MemoryHistory } from 'history';
import AddCourseModal from '../../components/Modals/AddCourseModal';
import useAction from '@doorward/ui/hooks/useActions';
import { ModalFeatures, ModalProps } from '@doorward/ui/components/Modal';
import DoorwardApi from '../../services/apis/doorward.api';

const AddCourse: React.FunctionComponent<AddCourseProps> = (props) => {
  const createCourse = useAction(DoorwardApi.courses.createCourse, {
    onSuccess: props.useModal.closeModal(),
  });

  const onSubmit = (values: AddCourseFormState, actions: FormikActions<AddCourseFormState>): void => {
    createCourse(values);
  };
  return (
    <AddCourseModal
      useModal={props.useModal}
      features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
      onSubmit={onSubmit}
      title={props.title}
    />
  );
};

export interface AddCourseProps extends ModalProps {
  title: string;
  history: MemoryHistory;
}

export default AddCourse;
