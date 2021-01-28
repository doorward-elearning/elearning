import React, { useEffect } from 'react';
import { ArrayHelpers, FieldArray, FormikProps } from 'formik';
import './AddCourseForm.scss';
import { UseForm } from '@doorward/ui/hooks/useForm';
import Button from '@doorward/ui/components/Buttons/Button';
import IfElse from '@doorward/ui/components/IfElse';
import TextField from '@doorward/ui/components/Input/TextField';
import Icon from '@doorward/ui/components/Icon';
import { UseModal } from '@doorward/ui/hooks/useModal';
import NumberField from '@doorward/ui/components/Input/NumberField';
import Header from '@doorward/ui/components/Header';
import { CreateCourseBody } from '@doorward/common/dtos/body';
import BasicForm from '../BasicForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CourseResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import useRequestToast from '@doorward/ui/hooks/useRequestToast';

const CourseModules: React.FunctionComponent<CourseModulesProps> = ({
  minModules,
  maxModules,
  ...props
}): JSX.Element => {
  const CourseModulesList: React.FunctionComponent<ArrayHelpers> = (arrayHelpers) => {
    return (
      <div className="course-modules">
        <Header size={2}>{translate('modules')}</Header>
        <p>{translate('specifyNamesOfModulesOfTheCourse')}</p>
        {props.values.modules.map((module, index) => (
          <div className="course-module" key={index}>
            <TextField name={`modules.${index}.title`} icon="calendar_view_day" />
            <IfElse condition={index > 0}>
              <Icon icon="close" onClick={(): void => arrayHelpers.remove(index)} />
            </IfElse>
          </div>
        ))}
        <Button type="button" className="add-module" onClick={(): void => arrayHelpers.push({ title: '' })}>
          {translate('addModule')}
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
          modules.push({ title: '' });
        }
      }
    }
  }, [noOfModules]);
  return <FieldArray name="modules">{CourseModulesList}</FieldArray>;
};

const AddCourseForm: React.FunctionComponent<AddCourseFormProps> = (props) => {
  const modules = { min: 1, max: 10 };

  const [createCourse, createCourseState] = useApiAction(DoorwardApi, (api) => api.courses.createCourse);

  useRequestToast(createCourseState);

  const initialValues = {
    title: '',
    description: '',
    modules: [{ title: '' }],
    noOfModules: 1,
  };

  return (
    <BasicForm
      showOverlay
      initialValues={initialValues}
      formClassName="add-course-form"
      validationSchema={CreateCourseBody}
      submitAction={createCourse}
      state={createCourseState}
      showSuccessToast
      showErrorToast
      onSuccess={props.onSuccess}
      form={props.useForm}
    >
      {(formikProps): JSX.Element => (
        <React.Fragment>
          <div className="course-information">
            <Header size={2}>{translate('courseInformation')}</Header>
            <TextField name="title" icon="school" label={translate('courseName')} />
            <NumberField
              name="noOfModules"
              icon="calendar_view_day"
              label={translate('numberOfModules')}
              max={modules.max}
              min={modules.min}
            />
          </div>
          <CourseModules {...{ ...props, ...formikProps }} minModules={modules.min} maxModules={modules.max} />
        </React.Fragment>
      )}
    </BasicForm>
  );
};

export interface AddCourseFormProps {
  useModal: UseModal;
  title: string;
  useForm: UseForm<AddCourseFormState>;
  onSuccess: (response: CourseResponse) => void;
}

export interface CourseModulesProps extends AddCourseFormProps, FormikProps<AddCourseFormState> {
  minModules: number;
  maxModules: number;
}

export interface AddCourseFormState extends CreateCourseBody {
  noOfModules: number;
}

export default AddCourseForm;
