import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { Formik, FormikConfig, FormikProps } from 'formik';
import Spinner from '../Spinner';
import './Form.scss';
import IfElse from '../IfElse';
import { WebComponentState } from '../../../reducers/reducers';
import toast from '../../../utils/toast';

export const FormContext = React.createContext<FormContextProps>({});

const Form: FunctionComponent<FormProps<any>> = ({
  children,
  initialValues,
  onSubmit,
  showOverlay = false,
  validationSchema,
  state = {},
}) => {
  const [formikProps, setProps] = useState<FormikProps<any> | null>(null);

  useEffect(() => {
    if (formikProps && state.errors) {
      if (state.errors.errors) {
        formikProps.setErrors(state.errors.errors);
        formikProps.setSubmitting(false);
      } else if (state.errors.message) {
        formikProps.setSubmitting(false);
      }
    }
  }, [state.errors]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={(props): ReactNode | JSX.Element => {
        if (!formikProps) {
          setProps(props);
        }
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
  state?: WebComponentState<any>;
}

export interface FormContextProps {
  formikProps?: FormikProps<any>;
}
export default Form;
