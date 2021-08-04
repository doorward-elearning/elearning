import React, { ReactNode, useEffect, useState } from 'react';
import { Formik, FormikConfig, FormikErrors, FormikProps } from 'formik';
import Spinner, { SpinnerProps } from '../Spinner';
import './Form.scss';
import IfElse from '../IfElse';
import { UseForm } from '../../hooks/useForm';
import useFormSubmit from '../../hooks/useFormSubmit';
import FormMessage from './FormMessage';
import getValidationSchema from '@doorward/common/utils/getValidationSchema';
import usePromiseEffect from '@doorward/ui/hooks/usePromiseEffect';
import { WebComponentState } from '@doorward/api-actions/types';

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
  isInitialValid,
  resetOnSubmit,
  spinnerProps = {},
}: FormProps<T>): JSX.Element {
  const [allProps, setAllProps] = useState<FormikProps<T>>();
  const { formikProps, setFormikProps } = form;
  const [validation, setValidation] = useState(null);

  usePromiseEffect(getValidationSchema(validationSchema), setValidation, [validationSchema]);

  useEffect(() => {
    if (allProps && state?.errors) {
      if (state.errors.errors && !state.submitting) {
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
      onSubmit={(values, formikActions) => {
        if (resetOnSubmit) {
          formikActions.resetForm();
        }
        onSubmit(values, formikActions);
      }}
      validationSchema={validation || validationSchema}
      isInitialValid={isInitialValid}
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
              {!hideFormMessage && <FormMessage state={state} formikProps={props} />}
              <form className={formClassName} onSubmit={props.handleSubmit}>
                {(children as FormRenderProps<any>).apply ? (children as FormRenderProps<any>)(props) : children}
              </form>
            </FormContext.Provider>
            <IfElse condition={showOverlay && allProps?.isSubmitting}>
              <div className="ed-form__spinner">
                <Spinner {...spinnerProps} />
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
  spinnerProps?: SpinnerProps;
  resetOnSubmit?: boolean;
}

export interface FormContextProps {
  formikProps?: FormikProps<any>;
  editable?: boolean;
  validationSchema?: any;
  isInitialValid?: boolean | (() => boolean);
}
export default Form;
