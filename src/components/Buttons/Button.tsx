import React from 'react';
import Condition from '../Condition';
import Spinner from '../Spinner';
import classNames from 'classnames';
import './Buttons.scss';

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
      'eb-button': true,
      'eb-button--raised': !flat && !fab && !icon,
      'db-button--icon': !!icon,
      'db-button--fab': fab,
      'btn-circle': rounded,
      'eb-button--mini-fab': fab && mini,
      [`btn-${type}`]: true,
      [`eb-button--${theme}`]: !!theme,
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
