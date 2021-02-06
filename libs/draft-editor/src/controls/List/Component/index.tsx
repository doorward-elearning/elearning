/* @flow */

import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { getFirstIcon } from '../../../utils/toolbar';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import Option from '../../../components/Option';
import './styles.css';
import Icon from '@doorward/ui/components/Icon';

interface ListProps {
  expanded: boolean;
  doExpand: Function;
  doCollapse: Function;
  onExpandEvent: MouseEventHandler;
  config: Record<string, any>;
  onChange: Function;
  currentState: Record<string, any>;
  translations: Record<string, any>;
  indentDisabled: boolean;
  outdentDisabled: boolean;
}

export default class LayoutComponent extends Component<ListProps, any> {
  options = ['unordered', 'ordered', 'indent', 'outdent'];

  toggleBlockType: Function = (blockType: string): void => {
    const { onChange } = this.props;
    onChange(blockType);
  };

  indent: Function = (): void => {
    const { onChange } = this.props;
    onChange('indent');
  };

  outdent: Function = (): void => {
    const { onChange } = this.props;
    onChange('outdent');
  };

  // todo: evaluate refactoring this code to put a loop there and in other places also in code
  // hint: it will require moving click handlers
  renderInFlatList() {
    const {
      config,
      currentState: { listType },
      translations,
      indentDisabled,
      outdentDisabled,
    } = this.props;
    const { options, unordered, ordered, indent, outdent, className } = config;
    return (
      <div className={classNames('rdw-list-wrapper', className)} aria-label="rdw-list-control">
        {options.indexOf('unordered') >= 0 && (
          <Option
            value="unordered"
            onClick={this.toggleBlockType}
            className={classNames(unordered.className)}
            active={listType === 'unordered'}
            title={unordered.title || translations['components.controls.list.unordered']}
          >
            <Icon icon={unordered.icon} />
          </Option>
        )}
        {options.indexOf('ordered') >= 0 && (
          <Option
            value="ordered"
            onClick={this.toggleBlockType}
            className={classNames(ordered.className)}
            active={listType === 'ordered'}
            title={ordered.title || translations['components.controls.list.ordered']}
          >
            <Icon icon={ordered.icon} />
          </Option>
        )}
        {options.indexOf('indent') >= 0 && (
          <Option
            onClick={this.indent}
            disabled={indentDisabled}
            className={classNames(indent.className)}
            title={indent.title || translations['components.controls.list.indent']}
          >
            <Icon icon={indent.icon} />
          </Option>
        )}
        {options.indexOf('outdent') >= 0 && (
          <Option
            onClick={this.outdent}
            disabled={outdentDisabled}
            className={classNames(outdent.className)}
            title={outdent.title || translations['components.controls.list.outdent']}
          >
            <Icon icon={outdent.icon} />
          </Option>
        )}
      </div>
    );
  }

  renderInDropDown() {
    const {
      config,
      expanded,
      doCollapse,
      doExpand,
      onExpandEvent,
      onChange,
      currentState: { listType },
      translations,
    } = this.props;
    const { options, className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('rdw-list-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-list-control"
        title={title || translations['components.controls.list.list']}
      >
        <Icon icon={getFirstIcon(config)} />
        {this.options
          .filter((option) => options.indexOf(option) >= 0)
          .map((option, index) => (
            <DropdownOption
              key={index}
              value={option}
              disabled={this.props[`${option}Disabled`]}
              className={classNames('rdw-list-dropdownOption', config[option].className)}
              active={listType === option}
              title={config[option].title || translations[`components.controls.list.${option}`]}
            >
              <Icon icon={config[option].icon} />
            </DropdownOption>
          ))}
      </Dropdown>
    );
  }

  render(): Object {
    const {
      config: { inDropdown },
    } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}
