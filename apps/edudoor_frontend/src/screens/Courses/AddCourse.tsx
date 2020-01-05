import React from 'react';
import { ModalFeatures, ModalProps } from '@edudoor/ui/components/Modal';
import { FormikActions } from 'formik';
import { AddCourseFormState } from '../../components/Forms/AddCourseForm';
import { MemoryHistory } from 'history';
import useAction from '@edudoor/ui/hooks/useActions';
import { createCourseAction } from '../../reducers/courses/actions';
import AddCourseModal from '../../components/Modals/AddCourseModal';

const AddCourse: React.FunctionComponent<AddCourseProps> = props => {
  const createCourse = useAction(createCourseAction);

  const onSubmit = (values: AddCourseFormState, actions: FormikActions<AddCourseFormState>): void => {
    createCourse(values, () => {
      props.useModal.closeModal();
    });
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
