import React, { FunctionComponent, ReactNode } from 'react';
import { Formik, FormikConfig, FormikProps } from 'formik';

const Form: FunctionComponent<FormProps<any>> = ({ children, initialValues, onSubmit, validationSchema }) => {
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

export interface FormProps<Values> extends FormikConfig<Values> {
  children: (props: FormikProps<Values>) => React.ReactNode | JSX.Element;
}

export default Form;
