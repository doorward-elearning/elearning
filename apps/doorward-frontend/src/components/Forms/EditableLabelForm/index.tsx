import React from 'react';
import BasicForm from '../BasicForm';
import { Action, WebComponentState } from '@doorward/ui/reducers/reducers';
import EditableLabel from '@doorward/ui/components/Input/EditableLabel';
import useForm from '@doorward/ui/hooks/useForm';
import useToggle from '@doorward/ui/hooks/useToggle';
import './EditableLabelForm.scss';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';

function EditableLabelForm<T, A extends (...args: any[]) => Action>(props: EditableLabelFormProps<T, A>): JSX.Element {
  const [editing, setEditing] = useToggle(false);
  const hasPrivileges = usePrivileges();
  const form = useForm();
  const onSuccess = () => {
    setEditing(false);
  };
  const onCancel = () => {};

  const initialValues: any = {
    [props.name]: props.value,
  };

  return (
    <div className="editable-label-form">
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
        spinnerProps={{
          width: 20,
          height: 20,
        }}
        {...props}
      >
        <EditableLabel
          toggle={[editing, setEditing]}
          noEdit={!hasPrivileges(...props.privileges)}
          name={props.name}
          component={props.component}
          fluid
        />
      </BasicForm>
    </div>
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
  privileges?: Array<string>;
}

export default EditableLabelForm;
