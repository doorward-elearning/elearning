import React, { ReactNode, useEffect, useState } from 'react';
import { Formik, FormikConfig, FormikErrors, FormikProps } from 'formik';
import Spinner from '../Spinner';
import './Form.scss';
import IfElse from '../IfElse';
import { WebComponentState } from '../../../reducers/reducers';
import { UseForm } from '../../../hooks/useForm';
import useFormSubmit from '../../../hooks/useFormSubmit';
import FormMessage from './FormMessage';

export const FormContext = React.createContext<FormContextProps>({});

function Form<T>({
  children,
  initialValues,
  onSubmit,
  showOverlay = false,
  validationSchema,
  state,
  editable = true,
  form,
  hideFormMessage,
  formClassName,
}: FormProps<T>): JSX.Element {
  const [allProps, setAllProps] = useState<FormikProps<T>>();
  const { formikProps, setFormikProps } = form;

  useEffect(() => {
    if (allProps && state && state.errors) {
      if (state.errors.errors) {
        allProps.setErrors(state.errors.errors as FormikErrors<any>);
        allProps.setSubmitting(false);
      } else if (state.errors.message) {
        allProps.setSubmitting(false);
      }
    }
  }, [state]);

  useFormSubmit(state, () => {
    if (allProps) {
      allProps.setSubmitting(false);
    }
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={(props): ReactNode | JSX.Element => {
        if (!allProps) {
          setAllProps(props);
        }
        if (!formikProps || formikProps.isValid !== props.isValid) {
          setFormikProps(props);
        }

        return (
          <div className="ed-form">
            <FormContext.Provider value={{ formikProps: props, editable, validationSchema }}>
              <IfElse condition={!hideFormMessage}>
                <FormMessage state={state} formikProps={props} />
              </IfElse>
              <form className={formClassName} onSubmit={props.handleSubmit}>
                {(children as FormRenderProps<any>).apply ? (children as FormRenderProps<any>)(props) : children}
              </form>
            </FormContext.Provider>
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
}

export type FormRenderProps<Values> = (props: FormikProps<Values>) => React.ReactNode;

export interface FormProps<Values> extends FormikConfig<Values> {
  children: JSX.Element | React.ReactNode | React.ReactElement | FormRenderProps<Values>;
  showOverlay?: boolean;
  state?: WebComponentState<any>;
  form: UseForm<Values>;
  formClassName?: string;
  editable?: boolean;
  hideFormMessage?: boolean;
}

export interface FormContextProps {
  formikProps?: FormikProps<any>;
  editable?: boolean;
  validationSchema?: any;
}
export default Form;
