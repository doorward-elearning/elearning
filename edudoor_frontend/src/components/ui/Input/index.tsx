import React, { FunctionComponent, useRef } from 'react';
import _ from 'lodash';
import './styles/Input.scss';
import classNames from 'classnames';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import { FormContext } from '../Form';

export enum InputFeatures {
  LABEL = 1,
}

function withInput<R extends InputProps>(
  Input: FunctionComponent<R>,
  features: Array<InputFeatures | string | typeof InputFeatures> = [],
  defaultProps?: { [k in keyof R]?: string }
): FunctionComponent<R> {
  return ({ ...passedProps }): JSX.Element => {
    const props = { ...passedProps, ...defaultProps };
    const { name } = props;
    return (
      <FormContext.Consumer>
        {({ formikProps = {}, editable }): JSX.Element => {
          const inputProps: any = { ...props, formikProps };
          inputProps.onChange = formikProps.handleChange || props.onChange;
          inputProps.onBlur = formikProps.handleBlur;
          inputProps.value = _.get(formikProps.values, name);

          let error = '';
          if (formikProps && name && formikProps.touched && formikProps.touched[name]) {
            error = '' + (_.get(formikProps.errors, name) || '');
          }
          const className = classNames({
            'eb-input': true,
            error: !!error,
            [`label-${props.labelPosition || 'none'}`]: true,
          });
          return (
            <FeatureProvider features={features}>
              <div className={className}>
                <Feature feature={InputFeatures.LABEL}>
                  <label htmlFor={props.id}>{props.label || props.placeholder}</label>
                </Feature>
                <div className="eb-input__input">
                  <Input
                    {...{ name, editable, ...inputProps, className: `${inputProps.className || ''} ${className}` }}
                  />
                </div>
                <div className="eb-input__error-message">{error}</div>
              </div>
            </FeatureProvider>
          );
        }}
      </FormContext.Consumer>
    );
  };
}

export interface InputProps extends React.DetailedHTMLProps<any, any> {
  features?: Array<InputFeatures | string | typeof InputFeatures>;
  labelPosition?: 'left' | 'right' | 'top' | 'none';
  editable?: boolean;
}

export default withInput;
