import React, { ReactChild } from 'react';
import BasicForm from '../BasicForm';
import { createForumModuleItemAction } from '../../../reducers/forums/actions';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { ForumModuleItemBody } from '../../../services/models/requestBody';
import { FormikProps } from 'formik';
import { Module } from '@doorward/common/models/Module';
import { ModuleItemTypes } from '@doorward/common/models';

function AddModuleItemForm<T extends AddModuleItemFormState>(props: AddModuleItemFormProps<T>): JSX.Element {
  const initialValues: any = {
    title: '',
    content: null,
    type: props.type,
    ...(props.initialValues || ({} as T)),
  };
  const state = useSelector((state: State) => state.forums.addModuleItem);
  return (
    <BasicForm
      submitAction={createForumModuleItemAction}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      initialValues={initialValues}
      validationSchema={props.validationSchema}
      state={state}
      form={props.form}
      showSuccessToast
      showOverlay
      createData={props.createData || (values => [props.item.id, values])}
    >
      {props.children}
    </BasicForm>
  );
}

export interface AddModuleItemFormState extends ForumModuleItemBody {
  [name: string]: any;
}

export interface AddModuleItemFormProps<T extends AddModuleItemFormState> {
  onSuccess: () => void;
  onCancel: () => void;
  type: ModuleItemTypes;
  form: UseForm<T>;
  item: Module;
  initialValues?: Omit<T, keyof ForumModuleItemBody>;
  validationSchema?: ((props: any) => any) | any;
  createData?: (values: T) => Array<any>;
  children: Array<ReactChild> | ReactChild | ((formikProps: FormikProps<T>) => JSX.Element);
}

export default AddModuleItemForm;
