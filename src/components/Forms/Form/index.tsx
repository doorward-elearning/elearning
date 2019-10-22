import React, { FunctionComponent, ReactNode } from 'react';
import { Formik, FormikConfig, FormikProps } from 'formik';

export const FormContext = React.createContext<FormContextProps>({});

const Form: FunctionComponent<FormProps<any>> = ({ children, initialValues, onSubmit, validationSchema }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={(props): ReactNode | JSX.Element => {
        return <FormContext.Provider value={{ formikProps: props }}>{children(props)}</FormContext.Provider>;
      }}
    />
  );
};

export interface FormProps<Values> extends FormikConfig<Values> {
  children: (props: FormikProps<Values>) => React.ReactNode | JSX.Element;
}

export interface FormContextProps {
  formikProps?: FormikProps<any>;
}
export default Form;
