import * as React from 'react';
import {FormikConfig, FormikProps} from 'formik';

export interface FormProps<Values> extends FormikConfig<Values> {
    children: ((props: FormikProps<Values>) => React.ReactNode | JSX.Element);
}

export declare type LoginFormState = {
    username: string;
    password: string;
};

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

export interface TextFieldProps extends InputProps {
    emptyMessage?: string;
    icon?: string;
    error?: string;
}

export interface PasswordFieldProps extends TextFieldProps {

}

export interface CheckboxProps extends InputProps {
    label?: string;
}

