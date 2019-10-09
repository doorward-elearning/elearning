import React, { FunctionComponent, ReactNode } from 'react';
import { Formik } from 'formik';
import {FormProps} from '../../types';

const Form: FunctionComponent<FormProps<any>> = ({
  children,
  initialValues,
  onSubmit,
  validationSchema
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={(props): ReactNode | JSX.Element => {
        return children(props);
      }}
    />
  );
};

export default Form;
