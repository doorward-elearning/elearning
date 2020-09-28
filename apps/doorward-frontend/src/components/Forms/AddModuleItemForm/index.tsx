import React, { ReactChild } from 'react';
import BasicForm from '../BasicForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { FormikProps } from 'formik';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateModuleItemBody, CreateQuizBody } from '@doorward/common/dtos/body';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import useDoorwardApi from '../../../hooks/useDoorwardApi';

function AddModuleItemForm<T extends AddModuleItemFormState>(props: AddModuleItemFormProps<T>): JSX.Element {
  const initialValues: any = {
    title: '',
    content: null,
    type: props.type,
    ...(props.initialValues || ({} as T)),
  };
  const state = useDoorwardApi((state) => state.modules.createModuleItem);
  return (
    <BasicForm
      submitAction={DoorwardApi.modules.createModuleItem}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      initialValues={initialValues}
      validationSchema={props.validationSchema}
      state={state}
      form={props.form}
      showSuccessToast
      showOverlay
      createData={props.createData || ((values) => [props.item.id, values])}
    >
      {props.children}
    </BasicForm>
  );
}

export interface AddModuleItemFormState extends CreateModuleItemBody {}

export interface AddModuleItemFormProps<T extends AddModuleItemFormState> {
  onSuccess: () => void;
  onCancel: () => void;
  type: ModuleItemType;
  form: UseForm<T>;
  item: ModuleEntity;
  initialValues?: Partial<T>;
  validationSchema?: ((props: any) => any) | any;
  createData?: (values: T) => Array<any>;
  children: Array<ReactChild> | ReactChild | ((formikProps: FormikProps<T>) => JSX.Element);
}

export default AddModuleItemForm;
