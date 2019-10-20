import React from 'react';
import { FormikProps } from 'formik';
import TextField from '../../Input/TextField';
import TextArea from '../../Input/TextArea';
import Header from '../../Header';

const AddCourseForm: React.FunctionComponent<FormikProps<AddCourseFormState>> = props => {
  return (
    <form onSubmit={props.handleSubmit} className="add-course-form">
      <TextField name="name" icon="school" formikProps={props} label="Course name" />
      <TextArea name="description" icon="notes" formikProps={props} label="Course description" />
      <Header size={2}>Modules</Header>
      <TextField name="name" icon="school" formikProps={props} label="Course name" />
    </form>
  );
};

export interface AddCourseFormProps {}

export interface AddCourseFormState {}

export default AddCourseForm;
