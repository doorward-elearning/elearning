import {FormikConfig, FormikProps} from 'formik';
import * as React from "react";

export interface FormProps<Values> extends FormikConfig<Values>{
  children: ((props: FormikProps<Values>) => React.ReactNode | JSX.Element);
}

export declare type LoginFormState = {
  username: string;
  password: string;
};

export interface InputProps extends React.InputHTMLAttributes{
}
