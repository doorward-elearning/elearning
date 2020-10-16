import React, { ChangeEvent, ChangeEventHandler, FunctionComponent, useCallback, useContext, useState } from 'react';
import _ from 'lodash';
import './styles/Input.scss';
import classNames from 'classnames';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import { FormContext } from '../Form';
import IfElse from '../IfElse';
import getValidationSchema from '@doorward/common/utils/getValidationSchema';
import ErrorMessage, { getError } from '@doorward/ui/components/Input/ErrorMessage';

export enum InputFeatures {
  LABEL = 1,
}

const checkRequired = (field: string, schema: any) => {
  // TODO Make this function resolve more complex objects

  if (field) {
    field = field.replace(new RegExp('\\[', 'g'), '.').replace(new RegExp(']', 'g'), '');
    const fields = field.split('.');
    for (let i = 0; i < fields.length; i++) {
      if (!/\d+/.test(fields[i]) && schema) {
        if (schema.type === 'object') {
          schema = schema.fields[fields[i]];
          if (schema && schema.type === 'array') {
            schema = schema.innerType;
          }
        }
      }
    }
    if (schema && schema.tests) {
      return !!schema.tests.find((test: any) => test.name === 'required');
    }
  }
  return false;
};
function withInput<R extends InputProps>(
  Input: FunctionComponent<R>,
  features: Array<InputFeatures | string | typeof InputFeatures> = [],
  defaultProps?: { [k in keyof R]?: R[k] },
  debounceInput?: boolean
): FunctionComponent<R> {
  return ({ ...passedProps }): JSX.Element => {
    const props = { ...defaultProps, ...passedProps };

    const [changeEvent, setChangeEvent] = useState<ChangeEvent<HTMLInputElement>>();
    const [isRequired, setIsRequired] = useState(false);
    const { formikProps, editable, validationSchema } = useContext(FormContext);
    const { name } = props;

    const inputProps: any = { ...props, formikProps };

    const onValueChange = useCallback(
      _.debounce((e: ChangeEvent<HTMLInputElement>, handler: ChangeEventHandler) => {
        handler(e);
      }, 80),
      []
    );
    const clearChangeEvent = useCallback(
      _.debounce(() => {
        setChangeEvent(null);
      }, 160),
      []
    );

    const onChange = useCallback(
      (e, handler: ChangeEventHandler) => {
        if (!changeEvent) {
          handler(e);
          setChangeEvent({ ...e });
        } else {
          setChangeEvent({ ...e });
          onValueChange({ ...e }, handler);
          clearChangeEvent();
        }
      },
      [changeEvent]
    );

    inputProps.onChange = formikProps.handleChange || props.onChange;
    inputProps.onBlur = formikProps.handleBlur;
    inputProps.value = _.get(formikProps.values, name);
    inputProps.id = props.id || (props.idGenerator && props.idGenerator());

    getValidationSchema(validationSchema).then((validationSchema) => {
      setIsRequired(checkRequired(name, validationSchema && validationSchema.describe()));
    });

    const error = getError(formikProps, name);

    const className = classNames({
      'eb-input': true,
      error: !!error,
      [`label-${props.labelPosition || 'none'}`]: true,
      fluid: props.fluid,
      [props.className || '']: true,
      required: isRequired,
    });
    return (
      <FeatureProvider features={features}>
        <div className={className}>
          <Feature feature={InputFeatures.LABEL}>
            <label htmlFor={inputProps.id}>
              {props.label || props.placeholder}
              <IfElse condition={isRequired && props.label}>
                <span title="This field is required.">*</span>
              </IfElse>
            </label>
          </Feature>
          <div className="eb-input__input">
            <Input
              {...{ name, editable, ...inputProps, className: `${inputProps.className || ''} ${className}` }}
              value={changeEvent ? changeEvent?.target?.value : _.get(formikProps.values, name)}
              onChange={(e) => (debounceInput ? onChange(e, inputProps.onChange) : inputProps.onChange(e))}
            />
          </div>
          <div className="eb-input__error-message">
            <ErrorMessage name={name} />
          </div>
        </div>
      </FeatureProvider>
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
