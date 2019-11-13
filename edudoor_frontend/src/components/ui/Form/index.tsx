import React, { ReactNode, useEffect, useState } from 'react';
import { Formik, FormikConfig, FormikErrors, FormikProps } from 'formik';
import Spinner from '../Spinner';
import './Form.scss';
import IfElse from '../IfElse';
import { WebComponentState } from '../../../reducers/reducers';
import { UseForm, UseFormProps } from '../../../hooks/useForm';
import objectHash from 'object-hash';
import Tools from '../../../utils/Tools';
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
  formClassName,
}: FormProps<T>): JSX.Element {
  const { setFormikProps } = form;
  const [allProps, setAllProps] = useState<FormikProps<T>>();
  const [formHash, setFormHash] = useState('');

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
        const properties: (keyof UseFormProps<T>)[] = [
          'isValidating',
          'isSubmitting',
          'submitCount',
          'dirty',
          'isValid',
          'validateForm',
          'resetForm',
          'submitForm',
        ];
        const newProps = Tools.pick(props, properties);
        const hash = objectHash(newProps);
        if (hash !== formHash) {
          setFormHash(hash);
          setFormikProps(newProps);
          setAllProps(props);
        }
        return (
          <div className="ed-form">
            <FormContext.Provider value={{ formikProps: props, editable }}>
              <FormMessage state={state} formikProps={props} />
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

type FormRenderProps<Values> = (props: FormikProps<Values>) => React.ReactNode;

export interface FormProps<Values> extends FormikConfig<Values> {
  children: JSX.Element | React.ReactNode | React.ReactElement | FormRenderProps<Values>;
  showOverlay?: boolean;
  state?: WebComponentState<any>;
  form: UseForm<Values>;
  formClassName?: string;
  editable?: boolean;
}

export interface FormContextProps {
  formikProps?: FormikProps<any>;
  editable?: boolean;
}
export default Form;
