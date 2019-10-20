import React from 'react';
import Modal, { ModalFeatures, ModalProps } from '../../components/Modal';
import AddCourseForm, { AddCourseFormState } from '../../components/Forms/AddCourseForm';
import Form from '../../components/Forms/Form';
import { FormikProps } from 'formik';

const AddCourseModal: React.FunctionComponent<AddCourseModalProps> = props => {
  const onSubmit = () => {};
  return (
    <Modal useModal={props.useModal} features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}>
      <Form initialValues={{ name: '' }} onSubmit={onSubmit}>
        {(formikProps: FormikProps<AddCourseFormState>): JSX.Element => (
          <React.Fragment>
            <Modal.Header title={props.title} />
            <Modal.Body>
              <AddCourseForm {...formikProps} />
            </Modal.Body>
            <Modal.Footer buttons={{ positive: 'Save' }} props={{ positive: { disabled: !formikProps.isValid } }} />
          </React.Fragment>
        )}
      </Form>
    </Modal>
  );
};

export interface AddCourseModalProps extends ModalProps {
  title: string;
}

export default AddCourseModal;
