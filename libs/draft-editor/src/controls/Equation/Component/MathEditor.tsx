import React from 'react';

class MathEditor extends React.Component<MathEditorProps> {
  render(): JSX.Element {
    const { value, onChange, autoCommands, autoOperatorNames } = this.props;
    return <div className="ed-math-editor"></div>;
  }
}

export interface MathEditorProps {
  value?: string;
  onChange: (equation: string) => void;
  autoCommands: string;
  autoOperatorNames: string;
}

export default MathEditor;
