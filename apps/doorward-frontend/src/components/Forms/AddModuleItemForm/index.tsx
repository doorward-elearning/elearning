import React, { ReactChild } from 'react';
import BasicForm from '../BasicForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { FormikProps } from 'formik';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateModuleItemBody } from '@doorward/common/dtos/body';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';

function AddModuleItemForm<T extends CreateModuleItemBody>(props: AddModuleItemFormProps<T>): JSX.Element {
  const initialValues: any = {
    title: '',
    content: null,
    type: props.type,
    ...(props.initialValues || ({} as T)),
  };

  const editing = !!props.item;

  const state = useDoorwardApi((state) =>
    editing ? state.moduleItems.updateModuleItem : state.modules.createModuleItem
  );

  return (
    <BasicForm
      submitAction={editing ? DoorwardApi.moduleItems.updateModuleItem : DoorwardApi.modules.createModuleItem}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      initialValues={initialValues}
      validationSchema={props.validationSchema}
      state={state}
      form={props.form}
      showSuccessToast
      showOverlay
      createData={props.createData || ((values) => [editing ? props.item.id : props.module.id, values])}
    >
      {props.children}
    </BasicForm>
  );
}

export interface AddModuleItemFormProps<T extends CreateModuleItemBody> {
  onSuccess: () => void;
  onCancel: () => void;
  type: ModuleItemType;
  form: UseForm<T>;
  module: ModuleEntity;
  item?: ModuleItemEntity;
  initialValues?: Partial<T>;
  validationSchema?: ((props: any) => any) | any;
  createData?: (values: T) => Array<any>;
  children: Array<ReactChild> | ReactChild | ((formikProps: FormikProps<T>) => JSX.Element);
}

export default AddModuleItemForm;
