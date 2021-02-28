import React, {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import _ from 'lodash';
import './styles/Input.scss';
import classNames from 'classnames';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import { FormContext } from '../Form';
import IfElse from '../IfElse';
import getValidationSchema from '@doorward/common/utils/getValidationSchema';
import ErrorMessage, { getError } from '@doorward/ui/components/Input/ErrorMessage';
import usePromiseEffect from '@doorward/ui/hooks/usePromiseEffect';
import translate from '@doorward/common/lang/translate';
import Tooltip from '@doorward/ui/components/Tooltip';

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
    const mountedRef = useRef<boolean>(false);

    const inputProps: any = { ...props, formikProps };
    useEffect(() => {
      mountedRef.current = true;

      return () => {
        mountedRef.current = false;
      };
    }, []);

    const onValueChange = useCallback(
      _.debounce((e: ChangeEvent<HTMLInputElement>, handler: ChangeEventHandler) => {
        if (mountedRef.current) {
          handler(e);
        }
      }, 80),
      []
    );

    const clearChangeEvent = useCallback(
      _.debounce(() => {
        if (mountedRef.current) {
          setChangeEvent(null);
        }
      }, 160),
      []
    );

    const onChange = useCallback(
      (e, handler: ChangeEventHandler) => {
        if (!changeEvent) {
          handler(e);
          setChangeEvent({ ...e });
        } else {
          onValueChange({ ...e }, handler);
          setChangeEvent({ ...e });
          clearChangeEvent();
        }
      },
      [changeEvent]
    );

    inputProps.onChange = formikProps.handleChange || props.onChange;
    inputProps.onBlur = formikProps.handleBlur;
    inputProps.value = _.get(formikProps.values, name);
    inputProps.id = props.id || (props.idGenerator && props.idGenerator());

    usePromiseEffect(
      getValidationSchema(validationSchema),
      (validationSchema) => {
        setIsRequired(checkRequired(name, validationSchema && validationSchema.describe()));
      },
      [validationSchema]
    );

    const error = getError(formikProps, name, !props.alwaysShowError);

    const className = classNames({
      'eb-input': true,
      error: !!error,
      [`label-${props.labelPosition || 'none'}`]: true,
      fluid: props.fluid,
      [props.className || '']: true,
      required: isRequired,
      disabled: props.disabled,
    });
    return (
      <FeatureProvider features={features}>
        <div className={className}>
          <Feature feature={InputFeatures.LABEL}>
            <label htmlFor={inputProps.id}>
              {props.label || props.placeholder}
              <IfElse condition={isRequired && props.label}>
                <Tooltip title={translate('thisFieldIsRequired')} component={<span />}>
                  *
                </Tooltip>
              </IfElse>
            </label>
          </Feature>
          <div className="eb-input__input">
            <Input
              {...{ name, editable, ...inputProps, className: `${inputProps.className || ''} ${className}` }}
              value={changeEvent ? changeEvent?.target?.value : inputProps.value}
              onChange={(e) => {
                if (props.onValueChange && e.target.value) {
                  props.onValueChange(e.target.value);
                }
                return debounceInput ? onChange(e, inputProps.onChange) : inputProps.onChange(e);
              }}
            />
          </div>
          <div className="eb-input__error-message">
            <ErrorMessage name={name} alwaysShowError={props.alwaysShowError} />
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
  alwaysShowError?: boolean;
  onValueChange?: (value: any) => void;
}

export default withInput;
