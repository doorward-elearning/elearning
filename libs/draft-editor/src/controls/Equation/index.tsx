import React from 'react';
import { EditorState } from 'draft-js';
import LayoutComponent from './Component';
import { insertTeXBlock } from '../../utils/insertTeXBlock';

class Equation extends React.Component<EquationProps> {
  state = {
    expanded: false,
  };

  addEquation = () => {
    const { editorState, onChange } = this.props;

    const newEditorState = insertTeXBlock(editorState);

    onChange(newEditorState);
    this.doCollapse();
  };

  doExpand = () => {
    this.setState({ expanded: true });
  };

  doCollapse = () => {
    this.setState({ expanded: false });
  };

  render(): JSX.Element {
    const { config, translations } = this.props;
    const { expanded } = this.state;

    const EquationComponent = config.component || LayoutComponent;
    return (
      <EquationComponent
        config={config}
        translations={translations}
        onChange={this.addEquation}
        expanded={expanded}
        onExpand={this.doExpand}
        onCollapse={this.doCollapse}
      />
    );
  }
}

export interface EquationProps {
  editorState: EditorState;
  onChange: Function;
  modalHandler: Record<string, any>;
  config: Record<string, any>;
  translations: any;
}

export default Equation;
