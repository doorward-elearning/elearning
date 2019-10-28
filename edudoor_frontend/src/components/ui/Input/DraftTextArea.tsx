import React, { useEffect, useState } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import { Editor, RawDraftContentState } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import fullEditor from './tools/editorTools';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/DraftTextArea.scss';
import draftToHTML from 'draftjs-to-html';

const exportFunction = {
  json: (content: ContentState): string => JSON.stringify(convertToRaw(content)),
  html: (content: ContentState): string => draftToHTML(convertToRaw(content)),
};

const DraftTextArea: React.FunctionComponent<DraftTextAreaProps> = ({
  value,
  className,
  formikProps,
  children,
  name,
  exportAs = 'json',
  ...props
}): JSX.Element => {
  const editorRef = React.useRef(null);
  const [editorState, setEditorState] = React.useState(value);
  useEffect(() => {
    if (editorState) {
      const contentState = editorState.getCurrentContent();
      const value = !contentState.hasText() ? '' : exportFunction[exportAs](contentState);
      const event = { target: { value, name: name } };
      formikProps && formikProps.handleChange(event);
    }
  }, [editorState]);

  return (
    <div className={`${className} eb-input--draft-text-area`}>
      <Editor
        toolbar={fullEditor}
        wrapperClassName="eb-input--draft-text-area__wrapper"
        editorClassName="eb-input--draft-text-area__editor"
        toolbarClassName="eb-input--draft-text-area__toolbar"
        editorState={editorState || EditorState.createEmpty()}
        onEditorStateChange={setEditorState}
        ref={editorRef}
      />
      {children}
    </div>
  );
};
export interface DraftTextAreaProps extends InputProps {
  exportAs?: 'html';
}

export default withInput(DraftTextArea, [InputFeatures.LABEL]);
