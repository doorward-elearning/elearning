import React, { Component, MouseEventHandler } from 'react';
import './Dropdown.scss';
import classNames from 'classnames';
import Icon from '../Icon';
import { Link } from 'react-router-dom';
import { Icons } from '../../types/icons';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';

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
    window.addEventListener('resize', this.onWindowResized);
  }

  onWindowResized = () => {
    this.setState({ contentPosition: this.dropdownTrigger?.current?.getBoundingClientRect() });
  };

  onClickOutside = (e) => {
    if (!this.dropdown.current.contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  };

  componentWillUnmount(): void {
    document.removeEventListener('click', this.onClickOutside);
    window.removeEventListener('resize', this.onWindowResized);
  }

  computePositions = () => {
    // eslint-disable-next-line prefer-const
    let { positionX, positionY } = this.props;
    const contentPosition = this.dropdownContent?.current?.getBoundingClientRect();
    const triggerPosition = this.dropdownTrigger?.current?.getBoundingClientRect();
    const pointerSize = 7;

    if (positionX === 'center' && positionY === 'center') {
      positionY = 'bottom';
    }

    let left = 0,
      top = 0,
      pointerX,
      pointerY,
      pointerRotation = 225;

    if (contentPosition && triggerPosition) {
      if (positionX === 'left') {
        left = triggerPosition.x;
        pointerX = triggerPosition.width / 2 - pointerSize / 2;
      } else if (positionX === 'center') {
        left = triggerPosition.x + triggerPosition.width / 2 - contentPosition.width / 2;
        pointerX = contentPosition.width / 2 - pointerSize / 2;
      } else {
        left = triggerPosition.x - contentPosition.width + triggerPosition.width;
        pointerX = triggerPosition.x - contentPosition.x + (triggerPosition.width / 2 - pointerSize / 2);
      }

      if (positionY === 'bottom') {
        top = triggerPosition.y + triggerPosition.height;
        pointerY = -Math.ceil(pointerSize / 2);
      } else if (positionY === 'center') {
        top = triggerPosition.y + triggerPosition.height / 2 - contentPosition.height / 2;
        pointerY = contentPosition.height / 2 - pointerSize / 2;
        pointerRotation += 90;
        left = positionX === 'left' ? left - contentPosition.width : left + contentPosition.width;

        if (pointerX === 'left') {
          pointerX = contentPosition.width - Math.ceil(pointerSize / 2) - 2;
        } else {
          pointerX = -Math.ceil(pointerSize / 2);
          pointerRotation -= 180;
        }
      } else {
        top = triggerPosition.y - contentPosition.height;
        pointerY = contentPosition.height - (Math.ceil(pointerSize / 2) + 2);
        pointerRotation += 180;
      }
    }

    return { left, top, pointerX, pointerY, pointerRotation };
  };

  render(): JSX.Element {
    const { children, positionX, positionY, openOnHover, disabled, ...props } = this.props;
    const { open } = this.state;
    const { left, top, pointerX, pointerY, pointerRotation } = this.computePositions();

    const dropdownClassNames = classNames({
      'ed-dropdown': true,
      [positionX]: true,
      [positionY]: true,
      open,
    });
    return (
      <div ref={this.dropdown} className={dropdownClassNames}>
        <div
          className="ed-dropdown__trigger"
          ref={this.dropdownTrigger}
          onClick={(e): void => {
            if (!disabled) {
              if (props.preventClickPropagation) {
                e.stopPropagation();
              }
              this.setState({
                open: !open,
              });
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
        {!disabled &&
          ReactDOM.createPortal(
            <div className={dropdownClassNames}>
              <div
                className="ed-dropdown__content"
                style={{ left, top, transformOrigin: `0 0` }}
                ref={this.dropdownContent}
                onMouseOver={(e) => e.stopPropagation()}
              >
                <span
                  className="ed-dropdown-trigger-pointer"
                  style={{ left: pointerX, top: pointerY, transform: `rotate(${pointerRotation}deg)` }}
                />
                <div className="ed-dropdown__content--body">{children[1]}</div>
              </div>
            </div>,
            document.getElementById('dropdown-box')
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
  positionY?: 'top' | 'bottom' | 'center';
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
