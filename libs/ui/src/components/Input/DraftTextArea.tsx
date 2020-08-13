import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import withInput, { InputFeatures, InputProps } from './index';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import fullEditor from './tools/editorTools';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/DraftTextArea.scss';
import draftToHTML from 'draftjs-to-html';
import classNames from 'classnames';

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
  exportAs = 'json',
  ...props
}): JSX.Element => {
  const editorRef = React.useRef(null);
  const [editorState, setEditorState] = React.useState();
  useEffect(() => {
    setEditorState(value ? EditorState.createWithContent(convertFromRaw(value)) : EditorState.createEmpty());
  }, []);

  useEffect(() => {
    if (editorState) {
      const contentState = editorState.getCurrentContent();
      const value = !contentState.hasText() ? '' : exportFunction[exportAs](contentState);
      const event = { target: { value, name: name } };
      props.onChange(event);
    }
  }, [editorState]);

  return (
    <div
      className={classNames({
        [`${className} eb-input--draft-text-area`]: true,
        fluid: props.fluid,
      })}
    >
      <Editor
        toolbar={fullEditor}
        placeholder={props.placeholder}
        wrapperClassName="eb-input--draft-text-area__wrapper"
        editorClassName="eb-input--draft-text-area__editor"
        toolbarClassName="eb-input--draft-text-area__toolbar"
        editorState={editorState}
        onEditorStateChange={setEditorState}
        onBlur={() => formikProps.handleBlur({ target: { value, name } })}
        ref={editorRef}
      />
      {children}
    </div>
  );
};
export interface DraftTextAreaProps extends InputProps {
  exportAs?: 'html';
}

export default withInput(DraftTextArea, [InputFeatures.LABEL], { labelPosition: 'top' });
