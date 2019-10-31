import React, { useEffect } from 'react';
import Form from '../../../ui/Form';
import { FormikProps, FormikValues } from 'formik';
import TextField from '../../../ui/Input/TextField';
import Modal, { ModalProps } from '../../../ui/Modal';
import Header from '../../../ui/Header';
import addModuleForm from '../validations/addModuleForm';
import useAction from '../../../../hooks/useActions';
import { createCourseModuleAction } from '../../../../reducers/courses/actions';
import { CourseModuleBody } from '../../../../services/models/requestBody';
import { useSelector } from 'react-redux';
import { State } from '../../../../store/store';

const AddModuleForm: React.FunctionComponent<AddModuleFormProps> = props => {
  const initialValues = {
    title: '',
  };
  const state = useSelector((state: State) => state.courses.createModule);

  const createCourseModule = useAction(createCourseModuleAction);

  const onSubmit = (values: AddModuleFormState) => {
    createCourseModule(props.courseId, values);
  };

  useEffect(() => {
    if (state.data.module) {
      props.useModal.closeModal();
    }
  }, [state.data]);

  return (
    <Modal {...props}>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        showOverlay
        validationSchema={addModuleForm}
        state={state}
      >
        {(formikProps: FormikProps<AddModuleFormState>): JSX.Element => {
          return (
            <React.Fragment>
              <Modal.Header>
                <Header size={2}>Add Course Module</Header>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={formikProps.submitForm}>
                  <TextField name="title" label="Module Name" icon="calendar_view_day" />
                </form>
              </Modal.Body>
              <Modal.Footer buttons={{ positive: 'Save' }} onPositiveClick={formikProps.submitForm} />
            </React.Fragment>
          );
        }}
      </Form>
    </Modal>
  );
};

export interface AddModuleFormState extends CourseModuleBody {}

export interface AddModuleFormProps extends ModalProps {
  courseId: number;
}
export default AddModuleForm;
