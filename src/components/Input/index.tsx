import React, { FunctionComponent } from 'react';
import { FormikProps } from 'formik';

function withInput<R extends InputProps>(Input: FunctionComponent): FunctionComponent<R> {
  return ({ formikProps, ...props }): JSX.Element => {
    const inputProps = { ...props, formikProps };
    if (formikProps) {
      inputProps.onChange = formikProps.handleChange;
      inputProps.onBlur = formikProps.handleBlur;
      inputProps.value = formikProps.values[props.name];
    }
    return (
      <>
        <Input {...inputProps} />
      </>
    );
  };
}

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  formikProps?: FormikProps<any>;
}

export default withInput;
