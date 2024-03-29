/* @flow */

import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';
import Icon from '@doorward/ui/components/Icon';
import Tooltip from '@doorward/ui/components/Tooltip';

interface LayoutComponentProps {
  expanded: boolean;
  onExpandEvent: Function;
  onChange: Function;
  config: Record<string, any>;
  translations: any;
}

class LayoutComponent extends Component<LayoutComponentProps, any> {
  onChange: MouseEventHandler = (event: any): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  renderEmojiModal() {
    const {
      config: { popupClassName, emojis },
    } = this.props;
    return (
      <div className={classNames('rdw-emoji-modal', popupClassName)} onClick={stopPropagation}>
        {emojis.map((emoji, index) => (
          <span key={index} className="rdw-emoji-icon" onClick={this.onChange}>
            {emoji}
          </span>
        ))}
      </div>
    );
  }

  render() {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <Tooltip
        className="rdw-emoji-wrapper"
        aria-haspopup="true"
        aria-label="rdw-emoji-control"
        aria-expanded={expanded}
        title={title || translations('components_controls_emoji_emoji')}
      >
        <Option className={classNames(className)} value="unordered-list-item" onClick={onExpandEvent}>
          <Icon icon={icon} />
        </Option>
        {expanded ? this.renderEmojiModal() : undefined}
      </Tooltip>
    );
  }
}

export default LayoutComponent;
