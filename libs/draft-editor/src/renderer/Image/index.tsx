import React, { Component, MouseEventHandler } from 'react';
import { ContentState, EditorState, Modifier, SelectionState } from 'draft-js';
import classNames from 'classnames';
import Option from '../../components/Option';
import './styles.scss';
import { Rnd } from 'react-rnd';
import Icon from '@doorward/ui/components/Icon';

interface ImageProps {
  block: Record<string, any>;
  contentState: ContentState;
}

interface ImageState {
  clicked: boolean;
  dummy?: boolean;
  resizing?: boolean;
}

const getImageComponent = (config) =>
  class Image extends Component<ImageProps, ImageState> {
    state = {
      clicked: false,
      resizing: false,
    };

    setEntityAlignmentLeft: Function = (): void => {
      this.setEntityAlignment('left');
    };

    setEntityAlignmentRight: Function = (): void => {
      this.setEntityAlignment('right');
    };

    setEntityAlignmentCenter: Function = (): void => {
      this.setEntityAlignment('none');
    };

    setEntityAlignment: Function = (alignment): void => {
      const { block, contentState } = this.props;
      const entityKey = block.getEntityAt(0);
      contentState.mergeEntityData(entityKey, { alignment });
      config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
      this.setState({
        dummy: true,
      });
    };

    setEntitySize = (width, height) => {
      const { block, contentState } = this.props;
      const entityKey = block.getEntityAt(0);
      contentState.mergeEntityData(entityKey, { width, height });
      config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
    };

    toggleClicked: MouseEventHandler = (): void => {
      const { clicked } = this.state;
      this.setState({ clicked: !clicked });
    };

    renderAlignmentOptions(alignment) {
      return (
        <div
          className={classNames('rdw-image-alignment-options-popup', {
            'rdw-image-alignment-options-popup-right': alignment === 'right',
          })}
        >
          <Option onClick={this.setEntityAlignmentLeft} className="rdw-image-alignment-option">
            <Icon icon="format_align_left" />
          </Option>
          <Option onClick={this.setEntityAlignmentCenter} className="rdw-image-alignment-option">
            <Icon icon="format_align_center" />
          </Option>
          <Option onClick={this.setEntityAlignmentRight} className="rdw-image-alignment-option">
            <Icon icon="format_align_right" />
          </Option>
        </div>
      );
    }

    render() {
      const { block, contentState } = this.props;
      const { clicked, resizing } = this.state;
      const { isReadOnly, isImageAlignmentEnabled } = config;
      const entity = contentState.getEntity(block.getEntityAt(0));
      const { src, alignment, height, width, alt } = entity.getData();

      return (
        <span
          onClick={this.toggleClicked}
          className={classNames('rdw-image-alignment', {
            'rdw-image-left': alignment === 'left',
            'rdw-image-right': alignment === 'right',
            'rdw-image-center': !alignment || alignment === 'none',
            clicked,
          })}
        >
          <span className="rdw-image-imagewrapper">
            <Rnd
              disableDragging
              enableResizing={!isReadOnly()}
              onResizeStart={() => {
                this.setState({ resizing: true });
              }}
              onResizeStop={(e, direction, ref) => {
                this.setState({ resizing: false });
                this.setEntitySize(ref.style.width, ref.style.height);
              }}
              resizeHandleClasses={
                clicked || resizing
                  ? {
                      top: 'rdw-image-wrapper-handle top',
                      bottom: 'rdw-image-wrapper-handle bottom',
                      right: 'rdw-image-wrapper-handle right',
                      left: 'rdw-image-wrapper-handle left',
                      topLeft: 'rdw-image-wrapper-handle top-left',
                      topRight: 'rdw-image-wrapper-handle top-right',
                      bottomLeft: 'rdw-image-wrapper-handle bottom-left',
                      bottomRight: 'rdw-image-wrapper-handle bottom-right',
                    }
                  : {}
              }
            >
              <div style={{ width, height, position: 'relative' }}>
                <img src={src} alt={alt} />
                {!isReadOnly() && clicked && isImageAlignmentEnabled()
                  ? this.renderAlignmentOptions(alignment)
                  : undefined}
              </div>
            </Rnd>
          </span>
        </span>
      );
    }
  };

export default getImageComponent;
