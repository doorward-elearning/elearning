import React, { Component, MouseEventHandler } from 'react';
import './Dropdown.scss';
import classNames from 'classnames';
import Icon from '../Icon';
import { Link } from 'react-router-dom';
import { Icons } from '../../types/icons';

const Item: React.FunctionComponent<DropdownItemProps> = ({ children, link, onClick, icon, title }) => {
  return (
    <li className="dropdown-item">
      <Link to={link || '#'} onClick={onClick}>
        {icon && <Icon icon={icon} />} {title || children}
      </Link>
    </li>
  );
};

class Dropdown extends Component<DropdownProps> {
  static defaultProps = { positionX: 'left', positionY: 'bottom' };
  dropdown = React.createRef<HTMLDivElement>();
  dropdownContent = React.createRef<HTMLDivElement>();
  dropdownTrigger = React.createRef<HTMLDivElement>();
  state = {
    open: false,
  };
  static Item: React.ComponentType<DropdownItemProps>;
  static Menu: React.ComponentType<DropdownMenuProps>;
  static Arrow: React.ComponentType<ArrowProps>;
  static Divider: React.ComponentType<DividerProps>;

  container = document.getElementById('dropdown-box');

  componentDidMount(): void {
    document.addEventListener('click', this.onClickOutside);
  }

  onClickOutside = (e) => {
    if (!this.dropdown.current.contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  };

  componentWillUnmount(): void {
    document.removeEventListener('click', this.onClickOutside);
  }

  render(): JSX.Element {
    const { children, positionX, positionY, openOnHover, disabled, ...props } = this.props;
    const { open } = this.state;

    return (
      <div
        ref={this.dropdown}
        className={classNames({
          'ed-dropdown': true,
          [positionX]: true,
          [positionY]: true,
          open,
        })}
      >
        <div
          className="ed-dropdown__trigger"
          ref={this.dropdownTrigger}
          onClick={(e): void => {
            if (!disabled) {
              if (props.preventClickPropagation) {
                e.stopPropagation();
              }
              this.setState({ open: !open });
            }
          }}
          onMouseEnter={() => {
            if (!disabled) {
              openOnHover && this.setState({ open: true });
            }
          }}
        >
          {children[0]}
        </div>
        {!disabled && (
          <div className="ed-dropdown__content" ref={this.dropdownContent}>
            <div className="ed-dropdown__content--body">{children[1]}</div>
          </div>
        )}
      </div>
    );
  }
}

export const Menu: React.FunctionComponent<DropdownMenuProps> = ({ children }) => {
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
  openOnHover?: boolean;
  preventClickPropagation?: boolean;
  disabled?: boolean;
}

export interface DropdownItemProps {
  link?: string;
  icon?: Icons;
  onClick?: MouseEventHandler<any>;
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
