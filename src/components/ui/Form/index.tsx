import React, { FunctionComponent, ReactNode } from 'react';
import { Formik, FormikConfig, FormikProps } from 'formik';
import Spinner from '../Spinner';
import './Form.scss';
import IfElse from '../IfElse';

export const FormContext = React.createContext<FormContextProps>({});

const Form: FunctionComponent<FormProps<any>> = ({
  children,
  initialValues,
  onSubmit,
  showOverlay = false,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={(props): ReactNode | JSX.Element => {
        return (
          <div className="ed-form">
            <FormContext.Provider value={{ formikProps: props }}>{children(props)}</FormContext.Provider>
            <IfElse condition={showOverlay && props.isSubmitting}>
              <div className="ed-form__spinner">
                <Spinner />
              </div>
            </IfElse>
          </div>
        );
      }}
    />
  );
};

export interface FormProps<Values> extends FormikConfig<Values> {
  children: (props: FormikProps<Values>) => React.ReactNode | JSX.Element;
  showOverlay?: boolean;
}

export interface FormContextProps {
  formikProps?: FormikProps<any>;
}
export default Form;
