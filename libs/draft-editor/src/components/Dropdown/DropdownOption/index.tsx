/* @flow */

import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';
import './styles.css';
import Tooltip from '@doorward/ui/components/Tooltip';

interface DropdownOptionProps {
  children?: any;
  value?: any;
  onClick?: Function;
  onSelect?: Function;
  setHighlighted?: Function;
  index?: number;
  disabled?: boolean;
  active?: boolean;
  highlighted?: boolean;
  className?: string;
  activeClassName?: string;
  disabledClassName?: string;
  highlightedClassName?: string;
  title?: string;
}

export default class DropDownOption extends Component<DropdownOptionProps> {
  static defaultProps = {
    activeClassName: '',
    disabledClassName: '',
    highlightedClassName: '',
  };

  onClick: MouseEventHandler = (event): void => {
    const { onSelect, onClick, value, disabled } = this.props;
    if (!disabled) {
      if (onSelect) {
        onSelect(value);
      }
      if (onClick) {
        event.stopPropagation();
        onClick(value);
      }
    }
  };

  setHighlighted: MouseEventHandler = (): void => {
    const { setHighlighted, index } = this.props;
    setHighlighted(index);
  };

  resetHighlighted: MouseEventHandler = (): void => {
    const { setHighlighted } = this.props;
    setHighlighted(-1);
  };

  render() {
    const {
      children,
      active,
      disabled,
      highlighted,
      className,
      activeClassName,
      disabledClassName,
      highlightedClassName,
      title,
    } = this.props;
    return (
      <li
        className={classNames('rdw-dropdownoption-default', className, {
          [`rdw-dropdownoption-active ${activeClassName}`]: active,
          [`rdw-dropdownoption-highlighted ${highlightedClassName}`]: highlighted,
          [`rdw-dropdownoption-disabled ${disabledClassName}`]: disabled,
        })}
        onMouseEnter={this.setHighlighted}
        onMouseLeave={this.resetHighlighted}
        onClick={this.onClick}
      >
        <Tooltip title={title}>{children}</Tooltip>
      </li>
    );
  }
}
// todo: review classname use above.
