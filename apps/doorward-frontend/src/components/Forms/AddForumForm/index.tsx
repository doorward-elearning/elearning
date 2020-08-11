import React, { useEffect } from 'react';
import { ArrayHelpers, FieldArray, FormikProps } from 'formik';
import './AddForumForm.scss';
import { UseForm } from '@doorward/ui/hooks/useForm';
import Button from '@doorward/ui/components/Buttons/Button';
import IfElse from '@doorward/ui/components/IfElse';
import TextField from '@doorward/ui/components/Input/TextField';
import Icon from '@doorward/ui/components/Icon';
import { CreateForumBody } from '../../../services/models/requestBody';
import { OnFormSubmit } from '@doorward/ui/types';
import { UseModal } from '@doorward/ui/hooks/useModal';
import NumberField from '@doorward/ui/components/Input/NumberField';
import Header from '@doorward/ui/components/Header';
import Form from '@doorward/ui/components/Form';
import addForumForm from './validation';

const ForumModules: React.FunctionComponent<ForumModulesProps> = ({
  minModules,
  maxModules,
  ...props
}): JSX.Element => {
  const ForumModulesList: React.FunctionComponent<
    ArrayHelpers
  > = arrayHelpers => {
    return (
      <div className="forum-modules">
        <Header size={2}>Modules</Header>
        <p>Specify the names of the modules of the forum.</p>
        {props.values.modules.map((module, index) => (
          <div className="forum-module" key={index}>
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
  return <FieldArray name="modules">{ForumModulesList}</FieldArray>;
};

const AddForumForm: React.FunctionComponent<AddForumFormProps> = props => {
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
      formClassName="add-forum-form"
      validationSchema={addForumForm}
      form={props.useForm}
    >
      {(formikProps): JSX.Element => (
        <React.Fragment>
          <div className="forum-information">
            <Header size={2}>Forum Information</Header>
            <TextField name="title" icon="school" label="Forum name" />
            <NumberField
              name="noOfModules"
              icon="calendar_view_day"
              label="Number of modules"
              max={modules.max}
              min={modules.min}
            />
          </div>
          <ForumModules
            {...{ ...props, ...formikProps }}
            minModules={modules.min}
            maxModules={modules.max}
          />
        </React.Fragment>
      )}
    </Form>
  );
};

export interface AddForumFormProps {
  onSubmit: OnFormSubmit<AddForumFormState>;
  useModal: UseModal;
  title: string;
  useForm: UseForm<AddForumFormState>;
}

export interface ForumModulesProps
  extends AddForumFormProps,
    FormikProps<AddForumFormState> {
  minModules: number;
  maxModules: number;
}

export interface AddForumFormState extends CreateForumBody {
  noOfModules: number;
}

export default AddForumForm;
