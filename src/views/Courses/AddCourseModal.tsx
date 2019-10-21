import React from 'react';
import Modal, { ModalFeatures, ModalProps } from '../../components/Modal';
import AddCourseForm, { AddCourseFormState } from '../../components/Forms/AddCourseForm';
import Form from '../../components/Forms/Form';
import { FormikProps } from 'formik';
import * as Yup from 'yup';

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

const AddCourseModal: React.FunctionComponent<AddCourseModalProps> = props => {
  const onSubmit = () => {};
  return (
    <Modal useModal={props.useModal} features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}>
      <Form
        initialValues={{ name: '', modules: [{ name: '' }], noOfModules: 1 }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {(formikProps: FormikProps<AddCourseFormState>): JSX.Element => {
          props.useModal.onClose(() => {
            formikProps.resetForm();
          });
          return (
            <React.Fragment>
              <Modal.Header title={props.title} />
              <Modal.Body>
                <AddCourseForm {...formikProps} />
              </Modal.Body>
              <Modal.Footer buttons={{ positive: 'Save' }} props={{ positive: { disabled: !formikProps.isValid } }} />
            </React.Fragment>
          );
        }}
      </Form>
    </Modal>
  );
};

export interface AddCourseModalProps extends ModalProps {
  title: string;
}

export default AddCourseModal;
