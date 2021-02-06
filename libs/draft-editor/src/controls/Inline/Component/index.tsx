/* @flow */

import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';

import './styles.css';
import Icon from '@doorward/ui/components/Icon';

interface InlineProps {
  expanded: boolean;
  doExpand: Function;
  doCollapse: Function;
  onExpandEvent: MouseEventHandler;
  config: Record<string, any>;
  onChange: Function;
  currentState: Record<string, any>;
  translations: Record<string, any>;
}

export default class Inline extends Component<InlineProps, any> {
  renderInFlatList() {
    const { config, currentState, onChange, translations } = this.props;
    return (
      <div className={classNames('rdw-inline-wrapper', config.className)} aria-label="rdw-inline-control">
        {config.options.map((style, index) => (
          <Option
            key={index}
            value={style}
            onClick={onChange}
            className={classNames(config[style].className)}
            active={currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE)}
            title={config[style].title || translations[`components.controls.inline.${style}`]}
          >
            <Icon icon={config[style].icon} />
          </Option>
        ))}
      </div>
    );
  }

  renderInDropDown() {
    const { config, expanded, doExpand, onExpandEvent, doCollapse, currentState, onChange, translations } = this.props;
    const { className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('rdw-inline-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-inline-control"
        title={title}
      >
        <Icon icon={getFirstIcon(config)} />
        {config.options.map((style, index) => (
          <DropdownOption
            key={index}
            value={style}
            className={classNames('rdw-inline-dropdownoption', config[style].className)}
            active={currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE)}
            title={config[style].title || translations[`components.controls.inline.${style}`]}
          >
            <Icon icon={config[style].icon} />
          </DropdownOption>
        ))}
      </Dropdown>
    );
  }

  render() {
    const {
      config: { inDropdown },
    } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

// todo: make subscript less low
