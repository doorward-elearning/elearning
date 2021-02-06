/* @flow */

import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';

interface HistoryProps {
  expanded: boolean;
  doExpand: Function;
  doCollapse: Function;
  onExpandEvent: MouseEventHandler;
  config: Record<string, any>;
  onChange: Function;
  currentState: Record<string, any>;
  translations: Record<string, any>;
}

export default class History extends Component<HistoryProps, any> {
  onChange = (obj) => {
    const { onChange } = this.props;
    onChange(obj);
  };

  renderInDropDown() {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      currentState: { undoDisabled, redoDisabled },
      translations,
    } = this.props;
    const { options, undo, redo, className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('rdw-history-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-history-control"
        title={title || translations['components.controls.history.history']}
      >
        <img src={getFirstIcon(config)} alt="" />
        {options.indexOf('undo') >= 0 && (
          <DropdownOption
            value="undo"
            onClick={this.onChange}
            disabled={undoDisabled}
            className={classNames('rdw-history-dropdownoption', undo.className)}
            title={undo.title || translations['components.controls.history.undo']}
          >
            <img src={undo.icon} alt="" />
          </DropdownOption>
        )}
        {options.indexOf('redo') >= 0 && (
          <DropdownOption
            value="redo"
            onClick={this.onChange}
            disabled={redoDisabled}
            className={classNames('rdw-history-dropdownoption', redo.className)}
            title={redo.title || translations['components.controls.history.redo']}
          >
            <img src={redo.icon} alt="" />
          </DropdownOption>
        )}
      </Dropdown>
    );
  }

  renderInFlatList() {
    const {
      config: { options, undo, redo, className },
      currentState: { undoDisabled, redoDisabled },
      translations,
    } = this.props;
    return (
      <div className={classNames('rdw-history-wrapper', className)} aria-label="rdw-history-control">
        {options.indexOf('undo') >= 0 && (
          <Option
            value="undo"
            onClick={this.onChange}
            className={classNames(undo.className)}
            disabled={undoDisabled}
            title={undo.title || translations['components.controls.history.undo']}
          >
            <img src={undo.icon} alt="" />
          </Option>
        )}
        {options.indexOf('redo') >= 0 && (
          <Option
            value="redo"
            onClick={this.onChange}
            className={classNames(redo.className)}
            disabled={redoDisabled}
            title={redo.title || translations['components.controls.history.redo']}
          >
            <img src={redo.icon} alt="" />
          </Option>
        )}
      </div>
    );
  }

  render(): Object {
    const { config } = this.props;
    if (config.inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}
