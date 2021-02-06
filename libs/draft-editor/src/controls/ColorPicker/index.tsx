import React, { Component } from 'react';
import { getSelectionCustomInlineStyle, toggleCustomInlineStyle } from 'draftjs-utils';

import LayoutComponent from './Component';
import { EditorState } from 'react-draft-wysiwyg';

interface ColorPickerProps {
  onChange: Function;
  editorState: EditorState;
  modalHandler?: Record<string, any>;
  config?: Record<string, any>;
  translations?: Record<string, any>;
}

class ColorPicker extends Component<ColorPickerProps, any> {
  private signalExpanded: boolean;

  state = {
    expanded: false,
    currentColor: undefined,
    currentBgColor: undefined,
  };

  constructor(props) {
    super(props);
    const { editorState, modalHandler } = props;
    const state = {
      expanded: false,
      currentColor: undefined,
      currentBgColor: undefined,
    };
    if (editorState) {
      state.currentColor = getSelectionCustomInlineStyle(editorState, ['COLOR']).COLOR;
      state.currentBgColor = getSelectionCustomInlineStyle(editorState, ['BGCOLOR']).BGCOLOR;
    }
    this.state = state;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({
        currentColor: getSelectionCustomInlineStyle(editorState, ['COLOR']).COLOR,
        currentBgColor: getSelectionCustomInlineStyle(editorState, ['BGCOLOR']).BGCOLOR,
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

  toggleColor = (style, color) => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(editorState, style, color);
    if (newState) {
      onChange(newState);
    }
    this.doCollapse();
  };

  render() {
    const { config, translations } = this.props;
    const { currentColor, currentBgColor, expanded } = this.state;
    const ColorPickerComponent = config.component || LayoutComponent;
    const color = currentColor && currentColor.substring(6);
    const bgColor = currentBgColor && currentBgColor.substring(8);
    return (
      <ColorPickerComponent
        config={config}
        translations={translations}
        onChange={this.toggleColor}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        currentState={{ color, bgColor }}
      />
    );
  }
}

export default ColorPicker;
