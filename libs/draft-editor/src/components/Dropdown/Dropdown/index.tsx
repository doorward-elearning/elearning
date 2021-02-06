import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';
import './styles.css';

import { stopPropagation } from '../../../utils/common';

interface DropdownProps {
  onChange?: Function;
  className?: string;
  expanded?: boolean;
  doExpand?: Function;
  doCollapse?: Function;
  onExpandEvent?: MouseEventHandler;
  optionWrapperClassName?: string;
  ariaLabel?: string;
  title?: string;
  children: any;
}

export default class Dropdown extends Component<DropdownProps> {
  state = {
    highlighted: -1,
  };

  componentDidUpdate(prevProps) {
    const { expanded } = this.props;
    if (prevProps.expanded && !expanded) {
      this.setState({
        highlighted: -1,
      });
    }
  }

  onChange = (value) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.toggleExpansion();
  };

  setHighlighted = (highlighted) => {
    this.setState({
      highlighted,
    });
  };

  toggleExpansion = () => {
    const { doExpand, doCollapse, expanded } = this.props;
    if (expanded) {
      doCollapse();
    } else {
      doExpand();
    }
  };

  render() {
    const { expanded, children, className, optionWrapperClassName, ariaLabel, onExpandEvent, title } = this.props;
    const { highlighted } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        className={classNames('rdw-dropdown-wrapper', className)}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'rdw-dropdown'}
      >
        <a className="rdw-dropdown-selectedtext" onClick={onExpandEvent} title={title}>
          {children[0]}
          <div
            className={classNames({
              'rdw-dropdown-carettoclose': expanded,
              'rdw-dropdown-carettoopen': !expanded,
            })}
          />
        </a>
        {expanded ? (
          <ul className={classNames('rdw-dropdown-optionwrapper', optionWrapperClassName)} onClick={stopPropagation}>
            {React.Children.map(options, (option, index) => {
              const temp =
                option &&
                React.cloneElement(option, {
                  onSelect: this.onChange,
                  highlighted: highlighted === index,
                  setHighlighted: this.setHighlighted,
                  index,
                });
              return temp;
            })}
          </ul>
        ) : undefined}
      </div>
    );
  }
}
