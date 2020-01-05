import { useState } from 'react';
import { FormikProps } from 'formik';

export interface UseForm<T> {
  setFormikProps: (formikProps: FormikProps<T>) => void;
  formikProps?: FormikProps<T>;
}

function useForm<T = any>(): UseForm<T> {
  const [formikProps, setFormikProps] = useState();

  // @formikProps will never be null
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return {
    setFormikProps,
    formikProps,
  };
}

export default useForm;
