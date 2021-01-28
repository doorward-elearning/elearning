import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import Icon from '@doorward/ui/components/Icon';
import { WebComponentState } from 'use-api-action/types/types';

const FormMessage: React.FunctionComponent<FormMessageProps> = (props) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    setError(props.state?.errors?.message);
    setSuccess(props.state?.data?.message);
  }, [props.state]);

  useEffect(() => {
    if (!props.formikProps.isValid && (error || success)) {
      setError('');
      setSuccess('');
    }
  }, [props.formikProps]);
  return (
    <div
      className={classNames({
        'ed-form__message': true,
        success,
        error,
      })}
    >
      <span>{error || success}</span>
      <Icon
        onClick={() => {
          setError('');
          setSuccess('');
        }}
        icon="close"
      />
    </div>
  );
};

export interface FormMessageProps {
  state?: WebComponentState<any>;
  formikProps: FormikProps<any>;
}

export default FormMessage;
