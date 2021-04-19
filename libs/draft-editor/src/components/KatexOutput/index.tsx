import React, { MouseEventHandler } from 'react';
import katex from 'katex';
import { ContentBlock, ContentState } from 'draft-js';
import './TeXEditor.scss';

export interface KatexOutputProps {
  content: string;
  onClick: MouseEventHandler;
}

export interface TeXBlockProps {
  block: ContentBlock;
  contentState: ContentState;
  blockProps: any;
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
    if (!this._getValue()) {
      this.onClick();
    }
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

    let className = 'TeXEditor-tex';
    if (this.state.editMode) {
      className += ' TeXEditor-activeTeX';
    }

    let editPanel = null;
    if (this.state.editMode) {
      let buttonClass = 'TeXEditor-saveButton';
      if (this.state.invalidTeX) {
        buttonClass += ' TeXEditor-invalidButton';
      }

      editPanel = (
        <div className="TeXEditor-panel">
          <textarea
            className="TeXEditor-texValue"
            onChange={this._onValueChange}
            ref="textarea"
            value={this.state.texValue}
          />
          <div className="TeXEditor-buttons">
            <button className={buttonClass} disabled={this.state.invalidTeX} onClick={this._save}>
              {this.state.invalidTeX ? 'Invalid TeX' : 'Done'}
            </button>
            <button className="TeXEditor-removeButton" onClick={this._remove}>
              Remove
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={className}>
        <KatexOutput content={texContent} onClick={this.onClick} />
        {editPanel}
      </div>
    );
  }
}
