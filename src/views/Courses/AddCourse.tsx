import React from 'react';
import Modal, { ModalFeatures, ModalProps } from '../../components/ui/Modal';
import { FormikActions } from 'formik';
import AddCourseForm, { AddCourseFormState } from '../../components/static/Forms/AddCourseForm';
import { MemoryHistory } from 'history';
import useAction from '../../hooks/useActions';
import { createCourseAction } from '../../reducers/courses/actions';

const AddCourse: React.FunctionComponent<AddCourseProps> = props => {
  const createCourse = useAction(createCourseAction);

  const onSubmit = (values: AddCourseFormState, actions: FormikActions<AddCourseFormState>): void => {
    createCourse(values, () => {
      props.useModal.closeModal();
    });
  };
  return (
    <Modal useModal={props.useModal} features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}>
      <AddCourseForm onSubmit={onSubmit} useModal={props.useModal} title={props.title} history={props.history} />
    </Modal>
  );
};

export interface AddCourseProps extends ModalProps {
  title: string;
  history: MemoryHistory;
}

export default AddCourse;
