/* @flow */

import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';
import './styles.css';
import Tooltip from '@doorward/ui/components/Tooltip';

interface OptionProps {
  onClick: Function;
  children?: any;
  value?: string;
  className?: string;
  activeClassName?: string;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}

export default class Option extends Component<OptionProps> {
  static defaultProps = {
    activeClassName: '',
  };

  onClick: MouseEventHandler = () => {
    const { disabled, onClick, value } = this.props;
    if (!disabled) {
      onClick(value);
    }
  };

  render() {
    const { children, className, activeClassName, active, disabled, title } = this.props;
    return (
      <Tooltip
        className={classNames('rdw-option-wrapper', className, {
          [`rdw-option-active ${activeClassName}`]: active,
          'rdw-option-disabled': disabled,
        })}
        onClick={this.onClick}
        aria-selected={active}
        title={title}
      >
        {children}
      </Tooltip>
    );
  }
}
