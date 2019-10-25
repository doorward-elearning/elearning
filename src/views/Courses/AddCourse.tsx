import React from 'react';
import Modal, { ModalFeatures, ModalProps } from '../../components/ui/Modal';
import { FormikActions, FormikProps } from 'formik';
import * as Yup from 'yup';
import Form from '../../components/ui/Form';
import AddCourseForm, { AddCourseFormState } from '../../components/static/Forms/AddCourseForm';
import { MemoryHistory } from 'history';
import ROUTES from '../../routes/routes';
import { useAction } from '../../hooks/useActions';
import { CREATE_COURSE } from '../../reducers/courses/types';

const schema = Yup.object().shape({
  name: Yup.string().required('The course name is required'),
  description: Yup.string().required('Please provide a short course description'),
  modules: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('The module name is required'),
      })
    )
    .required('Please provide at least one module in the course'),
});

const AddCourse: React.FunctionComponent<AddCourseModalProps> = props => {
  const createCourse = useAction({
    type: CREATE_COURSE,
    onSuccess: () => {
      props.useModal.closeModal();
    },
  });

  const onSubmit = (values: AddCourseFormState, actions: FormikActions<AddCourseFormState>): void => {
    createCourse({
      title: values.name,
      description: values.description,
    });
  };
  return (
    <Modal useModal={props.useModal} features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}>
      <Form
        showOverlay
        initialValues={{ name: '', modules: [{ name: '' }], noOfModules: 1 }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
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
