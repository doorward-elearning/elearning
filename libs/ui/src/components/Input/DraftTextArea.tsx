import React, { useEffect, useState } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import fullEditor from './tools/editorTools';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/DraftTextArea.scss';
import draftToHTML from 'draftjs-to-html';
import classNames from 'classnames';
import { generateEditorStateFromString } from '@doorward/ui/hoc/draftEditorWrapper';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';

const exportFunction = {
  json: (content: ContentState): object => convertToRaw(content),
  html: (content: ContentState): string => draftToHTML(convertToRaw(content)),
};

const DraftTextArea: React.FunctionComponent<DraftTextAreaProps> = ({
  value,
  className,
  formikProps,
  children,
  name,
  ...props
}): JSX.Element => {
  const editorRef = React.useRef(null);
  const [editorState, setEditorState] = React.useState();
  const [focused, setFocused] = useState(true);
  useEffect(() => {
    try {
      setEditorState(
        value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()
      );
    } catch (e) {
      setEditorState(EditorState.createWithContent(convertFromRaw(generateEditorStateFromString(value))));
    }
  }, []);

  useEffect(() => {
    if (editorState) {
      const contentState = editorState.getCurrentContent();
      const value = !contentState.hasText() ? '' : JSON.stringify(exportFunction.json(contentState));
      const event = { target: { value, name: name } };
      props.onChange(event);
    }
  }, [editorState]);

  let editing = props.editable;

  if (props.shy) {
    editing = focused;
  }

  return (
    <div
      className={classNames({
        [`${className} eb-input--draft-text-area`]: true,
        fluid: props.fluid,
      })}
    >
      {!editing ? (
        <div
          className="eb-input--draft-text-area__display"
          onClick={() => {
            setFocused(true);
          }}
        >
          <DraftHTMLContent content={value} />
        </div>
      ) : (
        <Editor
          toolbar={fullEditor}
          placeholder={props.placeholder}
          wrapperClassName="eb-input--draft-text-area__wrapper"
          editorClassName="eb-input--draft-text-area__editor"
          toolbarClassName="eb-input--draft-text-area__toolbar"
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onBlur={() => {
            formikProps.handleBlur({ target: { value, name } });
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          ref={editorRef}
        />
      )}
      {children}
    </div>
  );
};
export interface DraftTextAreaProps extends InputProps {
  shy?: boolean;
}

export default withInput(DraftTextArea, [InputFeatures.LABEL]);
