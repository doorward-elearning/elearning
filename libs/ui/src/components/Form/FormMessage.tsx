import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import Icon from '@doorward/ui/components/Icon';
import { WebComponentState } from 'use-api-action/types/types';

const FormMessage: React.FunctionComponent<FormMessageProps> = (props) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (!props.state?.submitting) {
      setError(props.state?.errors?.message);
      setSuccess(props.state?.data?.message);
    } else {
      setError('');
      setSuccess('');
    }
  }, [props.state]);
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
