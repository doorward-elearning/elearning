import React, { useEffect, useRef, useState } from 'react';
import BasicForm from '../BasicForm';
import EditableLabel from '@doorward/ui/components/Input/EditableLabel';
import useForm from '@doorward/ui/hooks/useForm';
import useToggle from '@doorward/ui/hooks/useToggle';
import './EditableLabelForm.scss';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import { ApiActionCreator, WebComponentState } from '@doorward/api-actions/types';
import translate from '@doorward/common/lang/translate';
import classNames from 'classnames';
import Tooltip from '@doorward/ui/components/Tooltip';

function EditableLabelForm<T>(props: EditableLabelFormProps<T>): JSX.Element {
  const [editing, setEditing] = useToggle(false);
  const hasPrivileges = usePrivileges();
  const form = useForm();
  const ref = useRef();
  const [success, setSuccess] = useState(false);
  const [prevValue, setPrevValue] = useState();
  const [initialValues, setInitialValues] = useState({ [props.name]: props.value });

  useEffect(() => {
    setInitialValues({
      [props.name]: props.value,
    });
  }, [props.name, props.value]);

  const onSuccess = () => {
    setSuccess(true);
    setEditing(false);
    setPrevValue('');
  };
  const onCancel = () => {};

  useEffect(() => {
    if (editing) {
      setSuccess(false);
      if (form.formikProps && !prevValue) {
        setPrevValue(form.formikProps.values[props.name]);
      }
    }
  }, [editing, form, prevValue]);

  useEffect(() => {
    if (!editing && form.formikProps && !success) {
      form.formikProps.setFieldValue(props.name, prevValue);
    }
  }, [editing, success, prevValue]);

  return (
    <div className={classNames('editable-label-form', { editing })}>
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
        <Tooltip title={translate('pressEnterToSubmit')} hidden={!editing}>
          <EditableLabel
            inputRef={ref}
            toggle={[editing, setEditing]}
            noEdit={!hasPrivileges(...props.privileges)}
            name={props.name}
            component={props.component}
            fluid
          />
        </Tooltip>
      </BasicForm>
    </div>
  );
}

export interface EditableLabelFormProps<T> {
  submitAction: ApiActionCreator;
  onSuccess?: () => void;
  state: WebComponentState<any>;
  name: string;
  component?: JSX.Element;
  value: string;
  createData?: (values: T) => any;
  privileges?: Array<string>;
}

export default EditableLabelForm;
