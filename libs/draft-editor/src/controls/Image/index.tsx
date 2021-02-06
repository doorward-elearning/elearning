import React, { Component } from 'react';
import { AtomicBlockUtils } from 'draft-js';

import LayoutComponent from './Component';
import { EditorState } from 'draft-js';

interface ImageControlProps {
  editorState: EditorState;
  onChange: Function;
  modalHandler: Record<string, any>;
  config: Record<string, any>;
  translations: Record<string, any>;
}

class ImageControl extends Component<ImageControlProps, any> {
  private signalExpanded: boolean;

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentWillUnmount() {}

  onExpandEvent = () => {
    this.signalExpanded = !this.state.expanded;
  };

  doExpand = () => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse = () => {
    this.setState({
      expanded: false,
    });
  };

  expandCollapse = () => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  };

  addImage = (src, height, width, alt) => {
    const { editorState, onChange, config } = this.props;
    const entityData = { src, height, width, alt: '' };
    if (config.alt.present) {
      entityData.alt = alt;
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', entityData)
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    onChange(newEditorState);
    this.doCollapse();
  };

  render() {
    const { config, translations } = this.props;
    const { expanded } = this.state;
    const ImageComponent = config.component || LayoutComponent;
    return (
      <ImageComponent
        config={config}
        translations={translations}
        onChange={this.addImage}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}

export default ImageControl;
