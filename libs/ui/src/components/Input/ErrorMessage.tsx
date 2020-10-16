import React from 'react';
import { FormContext } from '../Form';
import { get } from 'lodash';
import { FormikProps } from 'formik';
import './styles/ErrorMessage.scss';

export const getError = (formikProps: FormikProps<any>, name: string) => {
  let error: any;
  if (formikProps && name && formikProps.touched && get(formikProps.touched, name)) {
    error = get(formikProps.errors, name) || '';
  }
  return typeof error === 'string' ? error : '';
};

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ name }): JSX.Element => {
  return (
    <FormContext.Consumer>
      {({ formikProps }) => {
        const error = getError(formikProps, name);
        return <div className="ed-error-message">{error}</div>;
      }}
    </FormContext.Consumer>
  );
};

export interface ErrorMessageProps {
  name: string;
}

export default ErrorMessage;
