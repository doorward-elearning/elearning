import React, { CSSProperties, MouseEventHandler } from 'react';
import IfElse from '../IfElse';
import classNames from 'classnames';
import './Buttons.scss';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import { Icons } from '../../types/icons';

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
  tooltip = '',
  className,
  bordered = false,
  link,
  icon,
  style,
}) => {
  className = classNames({
    'eb-button': true,
    mini,
    bordered,
    fab,
    raised: !flat,
    [`btn-${theme}`]: true,
    [className || '']: true,
    icon: !!icon,
  });

  const Parent: any = link ? Link : React.Fragment;
  const parentProps = link ? { to: link } : {};
  return (
    <Parent {...parentProps}>
      <div
        className={classNames({
          'ed-button__container': true,
          loading,
        })}
        style={{ ...(style || {}) }}
      >
        <Spinner width={16} height={16} />
        <button disabled={disabled} className={className} onClick={onClick} type={type} title={tooltip}>
          <IfElse condition={!!icon}>
            <i className="material-icons">{icon}</i>
          </IfElse>
          <IfElse condition={!!children}>
            <span className="btn__text">{children}</span>
          </IfElse>
        </button>
      </div>
    </Parent>
  );
};

export interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  flat?: boolean;
  theme?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'accent' | 'secondary';
  type?: 'submit' | 'reset' | 'button';
  fab?: boolean;
  mini?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  icon?: Icons;
  className?: string;
  link?: string;
  onClick?: MouseEventHandler;
  tooltip?: string;
  style?: CSSProperties;
}

export default Button;
