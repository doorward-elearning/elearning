import React, { MouseEventHandler, useRef } from 'react';
import './Dropdown.scss';
import classNames from 'classnames';
import Icon from '../Icon';
import { Link } from 'react-router-dom';
import useStateRef from '../../../hooks/useStateRef';
import useClickOutside from '../../../hooks/useClickOutside';

const Item: React.FunctionComponent<DropdownItemProps> = ({ children, link, onClick, icon, title }) => {
  return (
    <li className="dropdown-item">
      <Link to={link || '#'} onClick={onClick}>
        {icon && <Icon icon={icon} />} {title || children}
      </Link>
    </li>
  );
};
const Dropdown: DropdownComponent = ({ children, positionX = 'left', positionY = 'bottom' }): JSX.Element => {
  const dropdown = useRef<any>(null);
  const [open, setOpen] = useStateRef(false);

  useClickOutside(() => {
    setOpen(false);
  }, dropdown);

  return (
    <div
      ref={dropdown}
      className={classNames({
        'ed-dropdown': true,
        [positionX]: true,
        [positionY]: true,
        open,
      })}
    >
      <div className="ed-dropdown__trigger" onClick={(): void => setOpen(!open)}>
        {children[0]}
      </div>
      <div className="ed-dropdown__content">
        <div className="ed-dropdown__content--body">{children[1]}</div>
      </div>
    </div>
  );
};

const Menu: React.FunctionComponent<DropdownMenuProps> = ({ children }) => {
  return <ul className="dropdown-menu">{children}</ul>;
};

const Arrow: React.FunctionComponent<ArrowProps> = ({ className = '' }) => {
  return <Icon className={className + ' dropdown-arrow'} icon="keyboard_arrow_down" />;
};

const Divider: React.FunctionComponent<DividerProps> = () => {
  return <li className="dropdown-divider" />;
};

export interface DropdownProps {
  children: [JSX.Element, JSX.Element];
  positionX?: 'left' | 'right' | 'center';
  positionY?: 'top' | 'bottom';
}

export interface DropdownItemProps {
  link?: string;
  icon?: string;
  onClick?: MouseEventHandler;
  title?: string;
}

export interface DropdownMenuProps {}

export interface DropdownComponent extends React.FunctionComponent<DropdownProps> {
  Item: React.FunctionComponent<DropdownItemProps>;
  Menu: React.FunctionComponent<DropdownMenuProps>;
  Arrow: React.FunctionComponent<ArrowProps>;
  Divider: React.FunctionComponent<DividerProps>;
}

export interface ArrowProps {
  className?: string;
}
export interface DividerProps {}

Dropdown.Item = Item;
Dropdown.Menu = Menu;
Dropdown.Arrow = Arrow;
Dropdown.Divider = Divider;

export default Dropdown;
