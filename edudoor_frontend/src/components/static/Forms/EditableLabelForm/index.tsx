import React, { useState } from 'react';
import BasicForm from '../BasicForm';
import { Action, WebComponentState } from '../../../../reducers/reducers';
import EditableLabel from '../../../ui/Input/EditableLabel';
import useForm from '../../../../hooks/useForm';
import useToggle from '../../../../hooks/useToggle';

function EditableLabelForm<T, A extends (...args: any[]) => Action>(props: EditableLabelFormProps<T, A>): JSX.Element {
  const [editing, setEditing] = useToggle(false);
  const form = useForm();
  const onSuccess = () => {
    setEditing(false);
  };
  const onCancel = () => {};

  const initialValues: any = {
    [props.name]: props.value,
  };

  return (
    <BasicForm
      onSuccess={onSuccess}
      onCancel={onCancel}
      features={[]}
      showSuccessToast={false}
      showErrorToast={false}
      showOverlay
      hideFormMessage
      form={form}
      initialValues={initialValues}
      {...props}
    >
      <EditableLabel toggle={[editing, setEditing]} name={props.name} component={props.component} fluid />
    </BasicForm>
  );
}

export interface EditableLabelFormProps<T, A extends (...args: any[]) => Action> {
  submitAction: A;
  onSuccess?: () => void;
  state: WebComponentState<any>;
  name: string;
  component?: JSX.Element;
  value: string;
  createData?: (values: T) => any;
}

export default EditableLabelForm;
