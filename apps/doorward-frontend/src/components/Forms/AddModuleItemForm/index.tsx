import React, { ReactChild } from 'react';
import BasicForm from '../BasicForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { FormikProps } from 'formik';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateModuleItemBody } from '@doorward/common/dtos/body';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { useApiAction } from 'use-api-action';

function AddModuleItemForm<T extends CreateModuleItemBody>(props: AddModuleItemFormProps<T>): JSX.Element {
  const initialValues: any = {
    title: '',
    content: null,
    type: props.type,
    ...(props.initialValues || ({} as T)),
  };

  const editing = !!props.item;

  const updateModuleItem = useApiAction(DoorwardApi, (api) => api.moduleItems.updateModuleItem);
  const createModuleItem = useApiAction(DoorwardApi, (api) => api.modules.createModuleItem);

  return (
    <BasicForm
      onSuccess={props.onSuccess}
      initialValues={initialValues}
      validationSchema={props.validationSchema}
      apiAction={editing ? updateModuleItem : createModuleItem}
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
