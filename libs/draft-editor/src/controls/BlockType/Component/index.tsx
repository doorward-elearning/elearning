import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';

interface LayoutComponentProps {
  expanded?: boolean;
  onExpandEvent?: MouseEventHandler;
  doExpand?: Function;
  doCollapse?: Function;
  onChange?: Function;
  config?: Record<string, any>;
  currentState?: Record<string, any>;
  translations?: any;
}

class LayoutComponent extends Component<LayoutComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      blockTypes: this.getBlockTypes(props.translations),
    };
  }

  componentDidUpdate(prevProps) {
    const { translations } = this.props;
    if (translations !== prevProps.translations) {
      this.setState({
        blockTypes: this.getBlockTypes(translations),
      });
    }
  }

  getBlockTypes = (translations) => [
    {
      label: 'Normal',
      displayName: translations('components_controls_blocktype_normal'),
    },
    {
      label: 'H1',
      displayName: translations('components_controls_blocktype_h1'),
    },
    {
      label: 'H2',
      displayName: translations('components_controls_blocktype_h2'),
    },
    {
      label: 'H3',
      displayName: translations('components_controls_blocktype_h3'),
    },
    {
      label: 'H4',
      displayName: translations('components_controls_blocktype_h4'),
    },
    {
      label: 'H5',
      displayName: translations('components_controls_blocktype_h5'),
    },
    {
      label: 'H6',
      displayName: translations('components_controls_blocktype_h6'),
    },
    {
      label: 'Blockquote',
      displayName: translations('components_controls_blocktype_blockquote'),
    },
    {
      label: 'Code',
      displayName: translations('components_controls_blocktype_code'),
    },
  ];

  renderFlat(blocks) {
    const {
      config: { className },
      onChange,
      currentState: { blockType },
    } = this.props;
    return (
      <div className={classNames('rdw-inline-wrapper', className)}>
        {blocks.map((block, index) => (
          <Option key={index} value={block.label} active={blockType === block.label} onClick={onChange}>
            {block.displayName}
          </Option>
        ))}
      </div>
    );
  }

  renderInDropdown(blocks) {
    const {
      config: { className, dropdownClassName, title },
      currentState: { blockType },
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      onChange,
      translations,
    } = this.props;
    const { blockTypes } = this.state;
    const currentBlockData = blockTypes.filter((blk) => blk.label === blockType);
    const currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].displayName;
    return (
      <div className="rdw-block-wrapper" aria-label="rdw-block-control">
        <Dropdown
          className={classNames('rdw-block-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title || translations('components_controls_blocktype_blocktype')}
        >
          <span>{currentLabel || translations('components_controls_blocktype_blocktype')}</span>
          {blocks.map((block, index) => (
            <DropdownOption active={blockType === block.label} value={block.label} key={index}>
              {block.displayName}
            </DropdownOption>
          ))}
        </Dropdown>
      </div>
    );
  }

  render() {
    const { config } = this.props;
    const { inDropdown } = config;
    const { blockTypes } = this.state;
    const blocks = blockTypes.filter(({ label }) => config.options.indexOf(label) > -1);
    return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
  }
}

export default LayoutComponent;
