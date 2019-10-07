import { ReactNode } from 'react';
import { FormikActions } from 'formik';

export interface FormProps {
  children: (object) => ReactNode;
  initialValues: object;
  onSubmit: (values, actions: FormikActions) => void;
}

export declare type LoginFormState = {
  username: string;
  password: string;
};
