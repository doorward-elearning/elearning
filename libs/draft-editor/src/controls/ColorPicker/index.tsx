import React, { Component } from 'react';
import { getSelectionCustomInlineStyle, toggleCustomInlineStyle } from 'draftjs-utils';

import LayoutComponent from './Component';
import { EditorState } from 'draft-js';

interface ColorPickerProps {
  onChange: Function;
  editorState: EditorState;
  modalHandler?: Record<string, any>;
  config?: Record<string, any>;
  translations?: any;
}

function CreateColorPicker(type: 'color' | 'bgcolor') {
  class ColorPicker extends Component<ColorPickerProps, any> {
    private signalExpanded: boolean;

    state = {
      expanded: false,
      currentColor: undefined,
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
        state.currentColor = getSelectionCustomInlineStyle(editorState, [type.toUpperCase()])[type.toUpperCase()];
      }
      this.state = state;
      modalHandler.registerCallBack(this.expandCollapse);
    }

    componentDidUpdate(prevProps) {
      const { editorState } = this.props;
      if (editorState && editorState !== prevProps.editorState) {
        this.setState({
          currentColor: getSelectionCustomInlineStyle(editorState, [type.toUpperCase()])[type.toUpperCase()],
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
      const { currentColor, expanded } = this.state;
      const ColorPickerComponent = config.component || LayoutComponent;
      const color = currentColor && currentColor.substring(type === 'color' ? 6 : 8);
      return (
        <ColorPickerComponent
          config={config}
          translations={translations}
          onChange={this.toggleColor}
          expanded={expanded}
          onExpandEvent={this.onExpandEvent}
          doExpand={this.doExpand}
          doCollapse={this.doCollapse}
          type={type}
          currentColor={color}
        />
      );
    }
  }
  return ColorPicker;
}
export default CreateColorPicker;
