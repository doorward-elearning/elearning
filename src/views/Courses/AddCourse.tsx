import React from 'react';
import Modal, { ModalFeatures, ModalProps } from '../../components/ui/Modal';
import { FormikActions, FormikProps } from 'formik';
import Form from '../../components/ui/Form';
import AddCourseForm, { AddCourseFormState } from '../../components/static/Forms/AddCourseForm';
import { MemoryHistory } from 'history';
import ROUTES from '../../routes/routes';
import useAction from '../../hooks/useActions';
import { createCourseAction } from '../../reducers/courses/actions';
import addCourseForm from '../../components/static/Forms/validations/addCourseForm';

const AddCourse: React.FunctionComponent<AddCourseModalProps> = props => {
  const initialValues = {
    title: '',
    description: '',
    modules: [{ name: '' }],
    noOfModules: 1,
  };
  const createCourse = useAction(createCourseAction);

  const onSubmit = (values: AddCourseFormState, actions: FormikActions<AddCourseFormState>): void => {
    createCourse(values, () => {
      props.useModal.closeModal();
    });
  };
  return (
    <Modal useModal={props.useModal} features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}>
      <Form showOverlay initialValues={initialValues} onSubmit={onSubmit} validationSchema={addCourseForm}>
        {(formikProps: FormikProps<AddCourseFormState>): JSX.Element => {
          props.useModal.onClose(() => {
            formikProps.resetForm();
            props.history.push(ROUTES.courseList.link);
          });
          return (
            <React.Fragment>
              <Modal.Header title={props.title} />
              <Modal.Body>
                <AddCourseForm {...formikProps} />
              </Modal.Body>
              <Modal.Footer
                buttons={{ positive: 'Save' }}
                onPositiveClick={formikProps.submitForm}
                props={{ positive: { disabled: !formikProps.isValid, type: 'submit' } }}
              />
            </React.Fragment>
          );
        }}
      </Form>
    </Modal>
  );
};

export interface AddCourseModalProps extends ModalProps {
  title: string;
  history: MemoryHistory;
}

export default AddCourse;
