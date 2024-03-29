/* @flow */

import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import { getFirstIcon } from '../../../utils/toolbar';
import './styles.css';
import Icon from '@doorward/ui/components/Icon';

interface TextAlignProps {
  expanded: boolean;
  doExpand: Function;
  doCollapse: Function;
  onExpandEvent: MouseEventHandler;
  config: Record<string, any>;
  onChange: Function;
  currentState: Record<string, any>;
  translations: any;
}

export default class TextAlign extends Component<TextAlignProps, any> {
  renderInFlatList() {
    const {
      config: { options, left, center, right, justify, className },
      onChange,
      currentState: { textAlignment },
      translations,
    } = this.props;
    return (
      <div className={classNames('rdw-text-align-wrapper', className)} aria-label="rdw-textalign-control">
        {options.indexOf('left') >= 0 && (
          <Option
            value="left"
            className={classNames(left.className)}
            active={textAlignment === 'left'}
            onClick={onChange}
            title={left.title || translations('components_controls_textalign_left')}
          >
            <Icon icon={left.icon} />
          </Option>
        )}
        {options.indexOf('center') >= 0 && (
          <Option
            value="center"
            className={classNames(center.className)}
            active={textAlignment === 'center'}
            onClick={onChange}
            title={center.title || translations('components_controls_textalign_center')}
          >
            <Icon icon={center.icon} />
          </Option>
        )}
        {options.indexOf('right') >= 0 && (
          <Option
            value="right"
            className={classNames(right.className)}
            active={textAlignment === 'right'}
            onClick={onChange}
            title={right.title || translations('components_controls_textalign_right')}
          >
            <Icon icon={right.icon} />
          </Option>
        )}
        {options.indexOf('justify') >= 0 && (
          <Option
            value="justify"
            className={classNames(justify.className)}
            active={textAlignment === 'justify'}
            onClick={onChange}
            title={justify.title || translations('components_controls_textalign_justify')}
          >
            <Icon icon={justify.icon} />
          </Option>
        )}
      </div>
    );
  }

  renderInDropDown() {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      currentState: { textAlignment },
      onChange,
      translations,
    } = this.props;
    const { options, left, center, right, justify, className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('rdw-text-align-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-textalign-control"
        title={title || translations('components_controls_textalign_textalign')}
      >
        <img
          src={(textAlignment && config[textAlignment] && config[textAlignment].icon) || getFirstIcon(config)}
          alt=""
        />
        {options.indexOf('left') >= 0 && (
          <DropdownOption
            value="left"
            active={textAlignment === 'left'}
            className={classNames('rdw-text-align-dropdownOption', left.className)}
            title={left.title || translations('components_controls_textalign_left')}
          >
            <Icon icon={left.icon} />
          </DropdownOption>
        )}
        {options.indexOf('center') >= 0 && (
          <DropdownOption
            value="center"
            active={textAlignment === 'center'}
            className={classNames('rdw-text-align-dropdownOption', center.className)}
            title={center.title || translations('components_controls_textalign_center')}
          >
            <Icon icon={center.icon} />
          </DropdownOption>
        )}
        {options.indexOf('right') >= 0 && (
          <DropdownOption
            value="right"
            active={textAlignment === 'right'}
            className={classNames('rdw-text-align-dropdownOption', right.className)}
            title={right.title || translations('components_controls_textalign_right')}
          >
            <Icon icon={right.icon} />
          </DropdownOption>
        )}
        {options.indexOf('justify') >= 0 && (
          <DropdownOption
            value="justify"
            active={textAlignment === 'justify'}
            className={classNames('rdw-text-align-dropdownOption', justify.className)}
            title={justify.title || translations('components_controls_textalign_justify')}
          >
            <Icon icon={justify.icon} />
          </DropdownOption>
        )}
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
