import React, { useEffect } from 'react';
import { ArrayHelpers, FieldArray, FormikActions, FormikProps, FormikValues } from 'formik';
import './AddCourseForm.scss';
import Header from '../../../ui/Header';
import TextField from '../../../ui/Input/TextField';
import IfElse from '../../../ui/IfElse';
import Icon from '../../../ui/Icon';
import Button from '../../../ui/Buttons/Button';
import DraftTextArea from '../../../ui/Input/DraftTextArea';
import NumberField from '../../../ui/Input/NumberField';
import { CreateCourseBody } from '../../../../services/requestBodies';
import Form from '../../../ui/Form';
import addCourseForm from '../validations/addCourseForm';
import ROUTES from '../../../../routes/routes';
import Modal from '../../../ui/Modal';
import { UseModal } from '../../../../hooks/useModal';
import { MemoryHistory } from 'history';
import { OnFormSubmit } from '../../../../types';

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

  const initialValues = {
    title: '',
    description: '',
    modules: [{ name: '' }],
    noOfModules: 1,
  };

  return (
    <Form showOverlay initialValues={initialValues} onSubmit={props.onSubmit} validationSchema={addCourseForm}>
      {(formikProps: FormikProps<AddCourseFormState>): JSX.Element => {
        props.useModal.onClose(() => {
          formikProps.resetForm();
          props.history.push(ROUTES.courses.link);
        });
        return (
          <React.Fragment>
            <Modal.Header title={props.title} />
            <Modal.Body>
              <form onSubmit={formikProps.handleSubmit} className="add-course-form">
                <div className="course-information">
                  <Header size={2}>Course Information</Header>
                  <TextField name="title" icon="school" label="Course name" />
                  <DraftTextArea name="description" icon="notes" label="Course description" exportAs="html" />
                  <NumberField
                    name="noOfModules"
                    icon="calendar_view_day"
                    label="Number of modules"
                    max={modules.max}
                    min={modules.min}
                  />
                </div>
                <CourseModules {...{ ...props, ...formikProps }} minModules={modules.min} maxModules={modules.max} />
              </form>
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
  );
};

export interface AddCourseFormProps {
  onSubmit: OnFormSubmit<AddCourseFormState>;
  useModal: UseModal;
  title: string;
  history: MemoryHistory;
}

export interface CourseModulesProps extends AddCourseFormProps, FormikProps<AddCourseFormState> {
  minModules: number;
  maxModules: number;
}

export interface AddCourseFormState extends CreateCourseBody {
  noOfModules: number;
}

export default AddCourseForm;
