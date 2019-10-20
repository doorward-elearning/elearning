import React from 'react';
import { FieldArray, FormikProps } from 'formik';
import TextField from '../../Input/TextField';
import TextArea from '../../Input/TextArea';
import Header from '../../Header';
import Button from '../../Buttons/Button';
import Icon from '../../Icon';
import './AddCourseForm.scss';
import IfElse from '../../IfElse';

const CourseModules: React.FunctionComponent<CourseModulesProps> = props => {
  return (
    <FieldArray
      name="modules"
      render={(arrayHelpers): JSX.Element => (
        <div className="course-modules">
          <Header size={2}>Modules</Header>
          {props.values.modules.map((module, index) => (
            <div className="course-module" key={index}>
              <TextField name={`modules.${index}.name`} icon="calendar_view_day" formikProps={props} />
              <IfElse condition={index > 0}>
                <Icon icon="close" onClick={(): void => arrayHelpers.remove(index)} />
              </IfElse>
            </div>
          ))}
          <Button type="button" className="add-module" onClick={(): void => arrayHelpers.push({ name: '' })}>
            Add Module
          </Button>
        </div>
      )}
    />
  );
};

const AddCourseForm: React.FunctionComponent<AddCourseFormProps> = props => {
  return (
    <form onSubmit={props.handleSubmit} className="add-course-form">
      <div className="course-information">
        <Header size={2}>Course Information</Header>
        <TextField name="name" icon="school" formikProps={props} label="Course name" />
        <TextArea name="description" icon="notes" formikProps={props} label="Course description" />
      </div>
      <CourseModules {...props} />
    </form>
  );
};

export interface AddCourseFormProps extends FormikProps<AddCourseFormState> {}

export interface CourseModulesProps extends AddCourseFormProps {}

export interface AddCourseFormState {
  name: string;
  description: string;
  modules: Array<{ name: '' }>;
}

export default AddCourseForm;
