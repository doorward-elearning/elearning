import React, { Component } from 'react';
import { getSelectionCustomInlineStyle, toggleCustomInlineStyle } from 'draftjs-utils';

import LayoutComponent from './Component';
import { EditorState } from 'react-draft-wysiwyg';

interface FontSizeProps {
  onChange: Function;
  editorState: EditorState;
  modalHandler: Record<string, any>;
  config: Record<string, any>;
  translations: Record<string, any>;
}

export default class FontSize extends Component<FontSizeProps, any> {
  private signalExpanded: boolean;

  constructor(props) {
    super(props);
    const { editorState, modalHandler } = props;
    this.state = {
      expanded: undefined,
      currentFontSize: editorState ? getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE : undefined,
    };
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({
        currentFontSize: getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE,
      });
    }
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

  toggleFontSize = (fontSize) => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(editorState, 'fontSize', fontSize);
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { config, translations } = this.props;
    const { expanded, currentFontSize } = this.state;
    const FontSizeComponent = config.component || LayoutComponent;
    const fontSize = currentFontSize && Number(currentFontSize.substring(9));
    return (
      <FontSizeComponent
        config={config}
        translations={translations}
        currentState={{ fontSize }}
        onChange={this.toggleFontSize}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}
