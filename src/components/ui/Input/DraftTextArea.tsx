import React, { useEffect } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import fullEditor from './tools/editorTools';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/DraftTextArea.scss';

const DraftTextArea: React.FunctionComponent<DraftTextAreaProps> = ({
  value,
  className,
  formikProps,
  children,
  name,
  icon,
  ...props
}): JSX.Element => {
  const editorRef = React.useRef(null);
  const [editorState, setEditorState] = React.useState(value);

  useEffect(() => {
    if (editorState) {
      const contentState = editorState.getCurrentContent();
      const value = !contentState.hasText() ? '' : JSON.stringify(convertToRaw(contentState));
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
export interface DraftTextAreaProps extends InputProps {}

export default withInput(DraftTextArea, [InputFeatures.LABEL]);
