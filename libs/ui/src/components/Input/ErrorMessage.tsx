import React from 'react';
import { FormContext } from '../Form';
import { get } from 'lodash';
import { FormikProps } from 'formik';
import './styles/ErrorMessage.scss';

export const getError = (formikProps: FormikProps<any>, name: string, checkTouched = true) => {
  let error: any;

  if (formikProps && name && (checkTouched ? get(formikProps?.touched || {}, name) : true)) {
    error = get(formikProps.errors, name) || '';
  }
  return typeof error === 'string' ? error : '';
};

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ name, alwaysShowError }): JSX.Element => {
  return (
    <FormContext.Consumer>
      {({ formikProps }) => {
        const error = getError(formikProps, name, !alwaysShowError);
        return <div className="ed-error-message">{error}</div>;
      }}
    </FormContext.Consumer>
  );
};

export interface ErrorMessageProps {
  name: string;
  alwaysShowError?: boolean;
}

export default ErrorMessage;
