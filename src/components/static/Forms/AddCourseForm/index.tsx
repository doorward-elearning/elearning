import React, { useEffect } from 'react';
import { ArrayHelpers, FieldArray, FormikProps } from 'formik';
import TextField from '../../../common/Input/TextField';
import Header from '../../../common/Header';
import Button from '../../../common/Buttons/Button';
import Icon from '../../../common/Icon';
import './AddCourseForm.scss';
import IfElse from '../../IfElse';
import NumberField from '../../Input/NumberField';
import DraftTextArea from '../../Input/DraftTextArea';
import DropdownSelect from '../../Input/DropdownSelect';

const CourseModules: React.FunctionComponent<CourseModulesProps> = ({
  minModules,
  maxModules,
  ...props
}): JSX.Element => {
  const CourseModulesList: React.FunctionComponent<ArrayHelpers> = arrayHelpers => {
    return (
      <div className="course-modules">
        <Header size={2}>Modules</Header>
        <p>Specify the names of the modules of the course.</p>
        {props.values.modules.map((module, index) => (
          <div className="course-module" key={index}>
            <TextField name={`modules.${index}.name`} icon="calendar_view_day" />
            <IfElse condition={index > 0}>
              <Icon icon="close" onClick={(): void => arrayHelpers.remove(index)} />
            </IfElse>
          </div>
        ))}
        <Button type="button" className="add-module" onClick={(): void => arrayHelpers.push({ name: '' })}>
          Add Module
        </Button>
      </div>
    );
  };

  const {
    values: { noOfModules, modules },
  } = props;
  useEffect(() => {
    const length = modules.length;
    if (noOfModules <= maxModules && noOfModules >= minModules) {
      for (let i = 0; i < Math.abs(noOfModules - length); i++) {
        if (noOfModules < length) {
          modules.pop();
        } else {
          modules.push({ name: '' });
        }
      }
    }
  }, [noOfModules]);
  return <FieldArray name="modules">{CourseModulesList}</FieldArray>;
};

const AddCourseForm: React.FunctionComponent<AddCourseFormProps> = props => {
  const modules = { min: 1, max: 10 };

  return (
    <form onSubmit={props.handleSubmit} className="add-course-form">
      <div className="course-information">
        <Header size={2}>Course Information</Header>
        <TextField name="name" icon="school" label="Course name" />
        <NumberField
          name="noOfModules"
          icon="calendar_view_day"
          label="Number of modules"
          max={modules.max}
          min={modules.min}
        />
        <DraftTextArea name="description" icon="notes" label="Course description" />
      </div>
      <CourseModules {...props} minModules={modules.min} maxModules={modules.max} />
    </form>
  );
};

export interface AddCourseFormProps extends FormikProps<AddCourseFormState> {}

export interface CourseModulesProps extends AddCourseFormProps {
  minModules: number;
  maxModules: number;
}

export interface AddCourseFormState {
  name: string;
  noOfModules: number;
  description: string;
  modules: Array<{ name: '' }>;
}

export default AddCourseForm;
