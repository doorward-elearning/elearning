import React, { FunctionComponent } from 'react';
import _ from 'lodash';
import './styles/Input.scss';
import classNames from 'classnames';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import { FormContext } from '../Forms/Form';

export enum InputFeatures {
  LABEL = 1,
}

function withInput<R extends InputProps>(
  Input: FunctionComponent<R>,
  features: Array<InputFeatures | string | typeof InputFeatures> = []
): FunctionComponent<R> {
  return ({ name = '', ...props }): JSX.Element => (
    <FormContext.Consumer>
      {({ formikProps = {} }) => {
        const inputProps: any = { ...props, formikProps };
        inputProps.onChange = formikProps.handleChange;
        inputProps.onBlur = formikProps.handleBlur;
        inputProps.value = _.get(formikProps.values, name);

        let error = '';
        if (formikProps && name) {
          error = '' + (_.get(formikProps.errors, name) || '');
        }
        const className = classNames({
          'eb-input': true,
          error: !!error,
        });
        return (
          <FeatureProvider features={features}>
            <div className={className}>
              <Feature feature={InputFeatures.LABEL}>
                <label htmlFor={props.id}>{props.label || props.placeholder}</label>
              </Feature>
              <Input {...{ name, ...inputProps, className: `${inputProps.className || ''} ${className}` }} />
              <div className="eb-input__error-message">{error}</div>
            </div>
          </FeatureProvider>
        );
      }}
    </FormContext.Consumer>
  );
}

export interface InputProps extends React.DetailedHTMLProps<any, any> {
  features?: Array<InputFeatures | string | typeof InputFeatures>;
}

export default withInput;
