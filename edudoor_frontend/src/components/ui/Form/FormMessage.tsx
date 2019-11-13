import React, { useEffect, useState } from 'react';
import { WebComponentState } from '../../../reducers/reducers';
import classNames from 'classnames';
import { FormikProps } from 'formik';

const FormMessage: React.FunctionComponent<FormMessageProps> = props => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    setError(props.state?.errors?.message);
    setSuccess(props.state?.data?.message);
  }, [props.state]);

  useEffect(() => {
    if (!props.formikProps.isValid) {
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
    </div>
  );
};

export interface FormMessageProps {
  state?: WebComponentState<any>;
  formikProps: FormikProps<any>;
}

export default FormMessage;
