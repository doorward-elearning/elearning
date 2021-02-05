import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import { ContentState, convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './styles/DraftTextArea.scss';
import draftToHTML from 'draftjs-to-html';
import classNames from 'classnames';
import { generateEditorStateFromString } from '@doorward/ui/hoc/draftEditorWrapper';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import _ from 'lodash';

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
  const [editorState, setEditorState] = React.useState<any>();
  const [focused, setFocused] = useState(true);
  useEffect(() => {
    let newState = null;
    try {
      newState = value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty();
    } catch (e) {
      newState = EditorState.createWithContent(convertFromRaw(generateEditorStateFromString(value)));
    }
    setEditorState(newState);
  }, []);

  useEffect(() => {
    if (!value && editorState?.getCurrentContent()?.hasText()) {
      setEditorState(EditorState.createEmpty());
    }
  }, [value]);

  const debounceChange = useCallback(
    _.debounce((e: ChangeEvent<HTMLInputElement>) => props.onChange(e), 50),
    []
  );

  useEffect(() => {
    if (editorState) {
      const contentState = editorState.getCurrentContent();
      const newValue = !contentState.hasText() ? '' : JSON.stringify(exportFunction.json(contentState));
      const event = { target: { value: newValue, name: name } };
      debounceChange(event as ChangeEvent<HTMLInputElement>);
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
          placeholder={props.placeholder}
          editorState={editorState || EditorState.createEmpty()}
          onChange={setEditorState}
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

export default withInput(DraftTextArea, [InputFeatures.LABEL], {}, false);
