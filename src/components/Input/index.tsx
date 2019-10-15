import React, { FunctionComponent } from 'react';
import { FormikProps } from 'formik';
import './styles/Input.scss';
import classNames from 'classnames';

function withInput<R extends InputProps>(Input: FunctionComponent): FunctionComponent<R> {
  return ({ formikProps, name = '', ...props }): JSX.Element => {
    const inputProps = { ...props, formikProps };
    if (formikProps) {
      inputProps.onChange = formikProps.handleChange;
      inputProps.onBlur = formikProps.handleBlur;
      inputProps.value = formikProps.values[name];
    }

    let error = '';
    if (formikProps && name) {
      error = '' + (formikProps.errors[name] || '');
    }
    const className = classNames({
      'eb-input': true,
      error: !!error,
    });
    return (
      <div className={className}>
        <Input {...{name, ...inputProps }} />
        <div className="eb-input__error-message">{error}</div>
      </div>
    );
  };
}

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  formikProps?: FormikProps<any>;
}

export default withInput;
