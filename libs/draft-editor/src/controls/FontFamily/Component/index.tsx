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

class LayoutComponent extends Component<LayoutComponentProps, any> {
  state = {
    defaultFontFamily: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0]);
      const defaultFontFamily = editorStyles.getPropertyValue('font-family');
      this.setState({
        // eslint-disable-line react/no-did-mount-set-state
        defaultFontFamily,
      });
    }
  }

  render() {
    const { defaultFontFamily } = this.state;
    const {
      config: { className, dropdownClassName, options, title },
      translations,
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
    } = this.props;
    let {
      currentState: { fontFamily: currentFontFamily },
    } = this.props;
    currentFontFamily =
      currentFontFamily ||
      (options &&
        defaultFontFamily &&
        options.some((opt) => opt.toLowerCase() === defaultFontFamily.toLowerCase()) &&
        defaultFontFamily);
    return (
      <div className="rdw-fontfamily-wrapper" aria-label="rdw-font-family-control">
        <Dropdown
          className={classNames('rdw-fontfamily-dropdown', className)}
          optionWrapperClassName={classNames('rdw-fontfamily-optionwrapper', dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title || translations['components.controls.fontfamily.fontfamily']}
        >
          <span className="rdw-fontfamily-placeholder">
            {currentFontFamily || translations['components.controls.fontfamily.fontfamily']}
          </span>
          {options.map((family, index) => (
            <DropdownOption active={currentFontFamily === family} value={family} key={index}>
              {family}
            </DropdownOption>
          ))}
        </Dropdown>
      </div>
    );
  }
}

export default LayoutComponent;
