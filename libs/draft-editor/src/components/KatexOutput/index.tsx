import React, { MouseEventHandler } from 'react';
import katex from 'katex';
import { ContentBlock, ContentState } from 'draft-js';
import './TeXEditor.scss';
import MathEquationEditor from '../MathEquationEditor';

export interface KatexOutputProps {
  content: string;
  onClick: MouseEventHandler;
}

export interface TeXBlockProps {
  block: ContentBlock;
  contentState: ContentState;
  blockProps: any;
  translations: any;
}

class KatexOutput extends React.Component<KatexOutputProps> {
  _update() {
    katex.render(this.props.content, this.refs.container, { displayMode: true });
  }

  componentDidMount() {
    this._update();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content !== this.props.content) {
      this._update();
    }
  }

  render() {
    return <div ref="container" onClick={this.props.onClick} />;
  }
}

export default class TeXBlock extends React.Component<TeXBlockProps> {
  state = {
    editMode: false,
    invalidTeX: false,
    texValue: undefined,
  };

  _onValueChange = (evt) => {
    const value = evt.target.value;
    let invalid = false;
    try {
      katex.__parse(value);
    } catch (e) {
      invalid = true;
    } finally {
      this.setState({
        invalidTeX: invalid,
        texValue: value,
      });
    }
  };

  componentDidMount() {
    setTimeout(() => {
      if (!this._getValue()) {
        this.onClick();
      }
    }, 100);
  }

  _save = () => {
    const entityKey = this.props.block.getEntityAt(0);
    const newContentState = this.props.contentState.mergeEntityData(entityKey, { content: this.state.texValue });
    this.setState(
      {
        invalidTeX: false,
        editMode: false,
        texValue: null,
      },
      this._finishEdit.bind(this, newContentState)
    );
  };

  _remove = () => {
    this.props.blockProps.onRemove(this.props.block.getKey());
  };
  _startEdit = () => {
    this.props.blockProps.onStartEdit(this.props.block.getKey());
  };
  _finishEdit = (newContentState) => {
    this.props.blockProps.onFinishEdit(this.props.block.getKey(), newContentState);
  };

  componentDidUpdate(prevProps: Readonly<TeXBlockProps>, prevState: Readonly<{}>, snapshot?: any) {
    if (!this._getValue()) {
      this.onClick();
    }
  }

  onClick = () => {
    if (this.state.editMode) {
      return;
    }

    this.setState(
      {
        editMode: true,
        texValue: this._getValue(),
      },
      () => {
        this._startEdit();
      }
    );
  };

  _getValue() {
    return this.props.contentState.getEntity(this.props.block.getEntityAt(0)).getData()['content'];
  }

  render() {
    let texContent = null;
    if (this.state.editMode) {
      if (this.state.invalidTeX) {
        texContent = '';
      } else {
        texContent = this.state.texValue;
      }
    } else {
      texContent = this._getValue();
    }

    return (
      <div className="TeXEditor-tex">
        <KatexOutput content={texContent} onClick={this.onClick} />
        <MathEquationEditor
          onClose={() => {
            if (!this._getValue()) {
              this._remove();
            }
            this.setState({
              editMode: false,
            });
          }}
          title={this.props.blockProps.title}
          onSubmit={(equation) => {
            this.setState(
              {
                texValue: equation,
                editMode: false,
              },
              this._save
            );
          }}
          autoOperatorNames={this.props.blockProps.autoOperatorNames}
          autoCommands={this.props.blockProps.autoCommands}
          value={this.state.texValue}
          open={this.state.editMode}
          translations={this.props.blockProps.translations}
        />
      </div>
    );
  }
}
