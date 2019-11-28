import React, { FunctionComponent } from 'react';
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
  defaultProps?: { [k in keyof R]?: R[k] }
): FunctionComponent<R> {
  return ({ ...passedProps }): JSX.Element => {
    const props = { ...defaultProps, ...passedProps };
    const { name } = props;
    return (
      <FormContext.Consumer>
        {({ formikProps = {}, editable }): JSX.Element => {
          const inputProps: any = { ...props, formikProps };
          inputProps.onChange = formikProps.handleChange || props.onChange;
          inputProps.onBlur = formikProps.handleBlur;
          inputProps.value = _.get(formikProps.values, name);
          inputProps.id = props.id || (props.idGenerator && props.idGenerator());

          let error = '';
          if (formikProps && name && formikProps.touched && _.get(formikProps.touched, name)) {
            error = '' + (_.get(formikProps.errors, name) || '');
          }
          const className = classNames({
            'eb-input': true,
            error: !!error,
            [`label-${props.labelPosition || 'none'}`]: true,
            fluid: props.fluid,
            [props.className || '']: true,
          });
          return (
            <FeatureProvider features={features}>
              <div className={className}>
                <Feature feature={InputFeatures.LABEL}>
                  <label htmlFor={inputProps.id}>{props.label || props.placeholder}</label>
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
  fluid?: boolean;
  idGenerator?: () => string;
  className?: string;
}

export default withInput;
