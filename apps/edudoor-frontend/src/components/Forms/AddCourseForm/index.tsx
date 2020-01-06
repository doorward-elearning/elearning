import React, { useEffect } from 'react';
import { ArrayHelpers, FieldArray, FormikProps } from 'formik';
import './AddCourseForm.scss';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import Button from '@edudoor/ui/components/Buttons/Button';
import IfElse from '@edudoor/ui/components/IfElse';
import TextField from '@edudoor/ui/components/Input/TextField';
import Icon from '@edudoor/ui/components/Icon';
import { CreateCourseBody } from '../../../services/models/requestBody';
import { OnFormSubmit } from '@edudoor/ui/types';
import { UseModal } from '@edudoor/ui/hooks/useModal';
import NumberField from '@edudoor/ui/components/Input/NumberField';
import Header from '@edudoor/ui/components/Header';
import Form from '@edudoor/ui/components/Form';
import addCourseForm from './validation';

const CourseModules: React.FunctionComponent<CourseModulesProps> = ({
  minModules,
  maxModules,
  ...props
}): JSX.Element => {
  const CourseModulesList: React.FunctionComponent<
    ArrayHelpers
  > = arrayHelpers => {
    return (
      <div className="course-modules">
        <Header size={2}>Modules</Header>
        <p>Specify the names of the modules of the course.</p>
        {props.values.modules.map((module, index) => (
          <div className="course-module" key={index}>
            <TextField
              name={`modules.${index}.title`}
              icon="calendar_view_day"
            />
            <IfElse condition={index > 0}>
              <Icon
                icon="close"
                onClick={(): void => arrayHelpers.remove(index)}
              />
            </IfElse>
          </div>
        ))}
        <Button
          type="button"
          className="add-module"
          onClick={(): void => arrayHelpers.push({ title: '' })}
        >
          Add Module
        </Button>
      </div>
    );
  };

  const {
    values: { noOfModules, modules }
  } = props;
  useEffect(() => {
    const length = modules.length;
    if (noOfModules <= maxModules && noOfModules >= minModules) {
      for (let i = 0; i < Math.abs(noOfModules - length); i++) {
        if (noOfModules < length) {
          modules.pop();
        } else {
          modules.push({ title: '' });
        }
      }
    }
  }, [noOfModules]);
  return <FieldArray name="modules">{CourseModulesList}</FieldArray>;
};

const AddCourseForm: React.FunctionComponent<AddCourseFormProps> = props => {
  const modules = { min: 1, max: 10 };

  const initialValues = {
    title: '',
    description: '',
    modules: [{ title: '' }],
    noOfModules: 1
  };

  return (
    <Form
      showOverlay
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      formClassName="add-course-form"
      validationSchema={addCourseForm}
      form={props.useForm}
    >
      {(formikProps): JSX.Element => (
        <React.Fragment>
          <div className="course-information">
            <Header size={2}>Course Information</Header>
            <TextField name="title" icon="school" label="Course name" />
            <NumberField
              name="noOfModules"
              icon="calendar_view_day"
              label="Number of modules"
              max={modules.max}
              min={modules.min}
            />
          </div>
          <CourseModules
            {...{ ...props, ...formikProps }}
            minModules={modules.min}
            maxModules={modules.max}
          />
        </React.Fragment>
      )}
    </Form>
  );
};

export interface AddCourseFormProps {
  onSubmit: OnFormSubmit<AddCourseFormState>;
  useModal: UseModal;
  title: string;
  useForm: UseForm<AddCourseFormState>;
}

export interface CourseModulesProps
  extends AddCourseFormProps,
    FormikProps<AddCourseFormState> {
  minModules: number;
  maxModules: number;
}

export interface AddCourseFormState extends CreateCourseBody {
  noOfModules: number;
}

export default AddCourseForm;
