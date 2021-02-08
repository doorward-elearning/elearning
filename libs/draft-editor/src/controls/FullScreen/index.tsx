import * as React from 'react';
import { EditorState } from 'draft-js';
import LayoutComponent from './Component';

interface FullScreenProps {
  onChange: Function;
  editorState: EditorState;
  modalHandler: Record<string, any>;
  config: Record<string, any>;
  translations: Record<string, any>;
  onFullScreenChanged: (fullScreen: boolean) => void;
  fullScreen: boolean;
}

interface FullScreenState {}

export default class FullScreen extends React.Component<FullScreenProps, FullScreenState> {
  render() {
    const { config, translations, fullScreen } = this.props;

    const FullScreenComponent = config.component || LayoutComponent;
    return (
      <FullScreenComponent
        config={config}
        translations={translations}
        fullScreen={fullScreen}
        onFullScreenChanged={this.props.onFullScreenChanged}
      />
    );
  }
}
