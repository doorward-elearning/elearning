import React, { MouseEventHandler } from 'react';
import Condition from '../IfElse';
import classNames from 'classnames';
import './Buttons.scss';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import IfElse from '../IfElse';
import { Icons } from '../../../types/icons';

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
      <button disabled={disabled} className={className} onClick={onClick} type={type} title={tooltip}>
        <Condition condition={loading}>
          <Spinner width={20} height={20} />
          <React.Fragment>
            <IfElse condition={!!icon}>
              <i className="material-icons">{icon}</i>
            </IfElse>
            <IfElse condition={!!children}>
              <span className="text">{children}</span>
            </IfElse>
          </React.Fragment>
        </Condition>
      </button>
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
}

export default Button;
