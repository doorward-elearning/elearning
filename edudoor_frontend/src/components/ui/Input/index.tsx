import React, { FunctionComponent, useRef } from 'react';
import _ from 'lodash';
import './styles/Input.scss';
import classNames from 'classnames';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import { FormContext } from '../Form';

export enum InputFeatures {
  LABEL = 1,
  LABEL_RIGHT = 2,
  LABEL_LEFT = 3,
}

function withInput<R extends InputProps>(
  Input: FunctionComponent<R>,
  features: Array<InputFeatures | string | typeof InputFeatures> = []
): FunctionComponent<R> {
  return ({ name = '', ...props }): JSX.Element => (
    <FormContext.Consumer>
      {({ formikProps = {} }): JSX.Element => {
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
          'label-right': features.includes(InputFeatures.LABEL_RIGHT),
          'label-left': features.includes(InputFeatures.LABEL_LEFT),
        });
        return (
          <FeatureProvider features={features}>
            <div className={className}>
              <Feature feature={[InputFeatures.LABEL_RIGHT, InputFeatures.LABEL, InputFeatures.LABEL_LEFT]}>
                <label htmlFor={props.id}>{props.label || props.placeholder}</label>
              </Feature>
              <div className="eb-input__input">
                <Input {...{ name, ...inputProps, className: `${inputProps.className || ''} ${className}` }} />
              </div>
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
