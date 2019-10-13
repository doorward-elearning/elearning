import React from 'react';
import Condition from '../Condition';
import Spinner from '../Spinner';
import classNames from 'classnames';

const Button: React.FunctionComponent<ButtonProps> = ({
  disabled,
  loading = false,
  children,
  flat = false,
  type = 'default',
  fab = false,
  theme,
  mini,
  rounded,
  className,
  icon,
}) => {
  className =
    className ||
    classNames({
      'mdl-button': true,
      'mdl-js-button': true,
      'mdl-button--raised': !flat && !fab && !icon,
      'mdl-button--icon': !!icon,
      'mdl-js-ripple-effect': !icon,
      'mdl-button--fab': fab,
      'btn-circle': rounded,
      'mdl-button--mini-fab': fab && mini,
      'm-b-10': true,
      [`btn-${type}`]: true,
      [`mdl-button--${theme}`]: !!theme,
    });
  return (
    <Condition condition={loading}>
      <Spinner />
      <button disabled={disabled} className={className}>
        {children}
      </button>
    </Condition>
  );
};

export interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  flat?: boolean;
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  fab?: boolean;
  theme?: 'primary' | 'accent' | 'secondary' | 'colored';
  mini?: boolean;
  rounded?: boolean;
  icon?: string;
  className?: string;
}

export default Button;
