/* @flow */

import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';

interface LayoutComponentProps {
  expanded: boolean;
  onExpandEvent: MouseEventHandler;
  doExpand: Function;
  doCollapse: Function;
  onChange: Function;
  config: Record<string, any>;
  currentState: Record<string, any>;
  translations: Record<string, any>;
}

export default class LayoutComponent extends Component<LayoutComponentProps, any> {
  state = {
    defaultFontSize: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = editorStyles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      this.setState({
        // eslint-disable-line react/no-did-mount-set-state
        defaultFontSize,
      });
    }
  }

  render() {
    const {
      config: { icon, className, dropdownClassName, options, title },
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
      translations,
    } = this.props;
    let {
      currentState: { fontSize: currentFontSize },
    } = this.props;
    let { defaultFontSize } = this.state;
    defaultFontSize = Number(defaultFontSize);
    currentFontSize = currentFontSize || (options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize);
    return (
      <div className="rdw-fontsize-wrapper" aria-label="rdw-font-size-control">
        <Dropdown
          className={classNames('rdw-fontsize-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title || translations['components.controls.fontsize.fontsize']}
        >
          {currentFontSize ? <span>{currentFontSize}</span> : <img src={icon} alt="" />}
          {options.map((size, index) => (
            <DropdownOption className="rdw-fontsize-option" active={currentFontSize === size} value={size} key={index}>
              {size}
            </DropdownOption>
          ))}
        </Dropdown>
      </div>
    );
  }
}
