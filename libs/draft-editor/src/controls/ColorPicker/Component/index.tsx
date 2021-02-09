import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';
import Icon from '@doorward/ui/components/Icon';

interface LayoutComponentProps {
  expanded: boolean;
  onExpandEvent: MouseEventHandler;
  onChange: Function;
  config: Record<string, any>;
  currentColor: string;
  translations: any;
  type: string;
}

class LayoutComponent extends Component<LayoutComponentProps, any> {
  onChange = (color) => {
    const { onChange, type } = this.props;
    onChange(type, color);
  };

  renderModal = () => {
    const {
      config: { popupClassName, colors },
      currentColor,
    } = this.props;
    return (
      <div className={classNames('rdw-colorpicker-modal', popupClassName)} onClick={stopPropagation}>
        <span className="rdw-colorpicker-modal-options">
          {colors.map((c, index) => (
            <Option
              value={c}
              key={index}
              className="rdw-colorpicker-option"
              activeClassName="rdw-colorpicker-option-active"
              active={currentColor === c}
              onClick={this.onChange}
            >
              <span style={{ backgroundColor: c }} className="rdw-colorpicker-cube" />
              {currentColor === c && <Icon icon="check" className="rdw-colorpicker-cube--check" />}
            </Option>
          ))}
        </span>
      </div>
    );
  };

  render() {
    const { config, expanded, onExpandEvent, translations, currentColor, type } = this.props;
    const { icon, className, title } = config;
    return (
      <div
        className="rdw-colorpicker-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
        title={title || translations('components_controls_colorpicker_colorpicker')}
      >
        <Option onClick={onExpandEvent} className={classNames('rdw-colorpicker-wrapper-option', className)}>
          <Icon icon={icon} />
          {
            <div
              style={{ background: currentColor || (type === 'color' ? 'black' : 'var(--bg-primary)') }}
              className="current-color"
            />
          }
        </Option>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
