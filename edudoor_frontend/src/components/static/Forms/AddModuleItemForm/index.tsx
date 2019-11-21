import React, { ReactChild, ReactChildren } from 'react';
import { Module, ModuleItemTypes } from '../../../../services/models';
import BasicForm from '../BasicForm';
import { createCourseModuleItemAction } from '../../../../reducers/courses/actions';
import { UseForm } from '../../../../hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import { CourseModuleItemBody } from '../../../../services/models/requestBody';

function AddModuleItemForm<T extends AddModuleItemFormState>(props: AddModuleItemFormProps<T>): JSX.Element {
  const initialValues: any = {
    ...(props.initialValues || ({} as T)),
    title: '',
    content: null,
    type: props.type,
  };
  const state = useSelector((state: State) => state.courses.addModuleItem);
  return (
    <BasicForm
      submitAction={createCourseModuleItemAction}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      initialValues={initialValues}
      validationSchema={props.validationSchema}
      state={state}
      form={props.form}
      showOverlay
      createData={values => [props.item.id, values]}
    >
      {props.children}
    </BasicForm>
  );
}

export interface AddModuleItemFormState extends CourseModuleItemBody {
  [name: string]: any;
}

export interface AddModuleItemFormProps<T extends AddModuleItemFormState> {
  onSuccess: () => void;
  onCancel: () => void;
  type: ModuleItemTypes;
  form: UseForm<T>;
  item: Module;
  initialValues?: Omit<T, keyof CourseModuleItemBody>;
  validationSchema?: ((props: any) => any) | any;
  children: ReactChildren | ReactChild;
}

export default AddModuleItemForm;
