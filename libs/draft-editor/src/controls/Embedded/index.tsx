import React, { Component } from 'react';
import { AtomicBlockUtils } from 'draft-js';

import LayoutComponent from './Component';
import { EditorState } from 'draft-js';

interface EmbeddedProps {
  editorState: EditorState;
  onChange?: Function;
  modalHandler?: Record<string, any>;
  config?: Record<string, any>;
  translations?: Record<string, any>;
}

class Embedded extends Component<EmbeddedProps, any> {
  private signalExpanded: boolean;

  state = {
    expanded: false,
  };

  componentDidMount() {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent = () => {
    this.signalExpanded = !this.state.expanded;
  };

  expandCollapse = () => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
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

  addEmbeddedLink = (embeddedLink, height, width) => {
    const {
      editorState,
      onChange,
      config: { embedCallback },
    } = this.props;
    const src = embedCallback ? embedCallback(embeddedLink) : embeddedLink;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('EMBEDDED_LINK', 'MUTABLE', { src, height, width })
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    onChange(newEditorState);
    this.doCollapse();
  };

  render() {
    const { config, translations } = this.props;
    const { expanded } = this.state;
    const EmbeddedComponent = config.component || LayoutComponent;
    return (
      <EmbeddedComponent
        config={config}
        translations={translations}
        onChange={this.addEmbeddedLink}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}

export default Embedded;

// todo: make default heights configurable
