import { useState } from 'react';
import { FormikErrors } from 'formik';

export type UseFormProps<Values> = {
  isValidating: boolean;
  isSubmitting: boolean;
  submitCount: number;
  dirty: boolean;
  isValid: boolean;
  validateForm(values?: any): Promise<FormikErrors<Values>>;
  validateField(field: string): void;
  resetForm(nextValues?: Values): void;
  submitForm(): void;
  values: Values;
};

export interface UseForm<T> {
  setFormikProps: (formikProps: UseFormProps<T>) => void;
  formikProps: UseFormProps<T>;
}

function useForm<T = any>(): UseForm<T> {
  const [formikProps, setFormikProps] = useState<UseFormProps<T>>();

  // @formikProps will never be null
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return { setFormikProps, formikProps };
}

export default useForm;
