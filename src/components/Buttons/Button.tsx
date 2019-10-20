import React, { MouseEventHandler } from 'react';
import Condition from '../IfElse';
import Spinner from '../Spinner';
import classNames from 'classnames';
import './Buttons.scss';
import { Link } from 'react-router-dom';

const Button: React.FunctionComponent<ButtonProps> = ({
  disabled,
  loading = false,
  children,
  onClick = (): void => {},
  flat = false,
  theme = 'primary',
  type,
  fab = false,
  mini,
  rounded,
  className,
  link,
  icon,
}) => {
  className = classNames({
    'eb-button': true,
    'eb-button--raised': !flat && !fab && !icon,
    'db-button--icon': !!icon,
    'db-button--fab': fab,
    'btn-circle': rounded,
    'eb-button--mini-fab': fab && mini,
    [`btn-${theme}`]: true,
    className: true,
  });

  const Parent: any = link ? Link : React.Fragment;
  return (
    <Condition condition={loading}>
      <Spinner />
      <Parent to={link}>
        <button disabled={disabled} className={className} onClick={onClick} type={type}>
          {children}
        </button>
      </Parent>
    </Condition>
  );
};

export interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  flat?: boolean;
  theme?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  type?: 'submit' | 'reset' | 'button';
  fab?: boolean;
  mini?: boolean;
  rounded?: boolean;
  icon?: string;
  className?: string;
  link?: string;
  onClick?: MouseEventHandler;
}

export default Button;
