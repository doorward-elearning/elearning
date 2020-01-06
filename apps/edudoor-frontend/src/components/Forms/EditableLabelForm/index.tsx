import React from 'react';
import BasicForm from '../BasicForm';
import { Action, WebComponentState } from '@edudoor/ui/reducers/reducers';
import EditableLabel from '@edudoor/ui/components/Input/EditableLabel';
import useForm from '@edudoor/ui/hooks/useForm';
import useToggle from '@edudoor/ui/hooks/useToggle';
import './EditableLabelForm.scss';
import { Roles } from '@edudoor/ui/components/RolesManager';
import useRoleManager from '@edudoor/ui/hooks/useRoleManager';

function EditableLabelForm<T, A extends (...args: any[]) => Action>(props: EditableLabelFormProps<T, A>): JSX.Element {
  const [editing, setEditing] = useToggle(false);
  const canEdit = useRoleManager(props.roles);
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
          noEdit={!canEdit}
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
  roles?: Array<Roles>;
}

export default EditableLabelForm;
