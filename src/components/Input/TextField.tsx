import React, { FunctionComponent } from 'react';
import withInput from './index';
import { TextFieldProps } from '../../types';
import classNames from 'classnames';

const TextField: FunctionComponent<TextFieldProps> = ({
  emptyMessage,
  error = '',
  value = '',
  ...props
}): JSX.Element => {
  const classes = classNames({
    'wrap-input100': true,
    'validate-input': true,
    error,
  });
  return (
    <div className="text-field">
      <div className={classes} data-validate={emptyMessage}>
        <input type="text" className="input100" {...props} value={value} />
        {props.icon && (
          <span className="focus-input100" data-placeholder={props.icon} />
        )}
      </div>
      <div className="error-message">{error}</div>
    </div>
  );
};

export default withInput<TextFieldProps>(TextField);
