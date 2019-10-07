import React, { FunctionComponent, ReactNode } from 'react';
import { Formik } from 'formik';
import { FormProps } from '../../@types/types';

const Form: FunctionComponent<FormProps> = ({
  children,
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={(props): ReactNode=> {
        return children(props);
      }}
    />
  );
};

export default Form;
