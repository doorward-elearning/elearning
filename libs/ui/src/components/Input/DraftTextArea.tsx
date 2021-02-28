import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import { Editor } from '@doorward/draft-editor';
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import './styles/DraftTextArea.scss';
import draftToHTML from 'draftjs-to-html';
import classNames from 'classnames';
import { generateEditorStateFromString } from '@doorward/ui/hoc/draftEditorWrapper';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import _ from 'lodash';
import DoorwardApi from '../../../../../apps/doorward-frontend/src/services/apis/doorward.api';
import Tooltip from '@doorward/ui/components/Tooltip';
import translate from '@doorward/common/lang/translate';

const exportFunction = {
  json: (content: ContentState): object => convertToRaw(content),
  html: (content: ContentState): string => draftToHTML(convertToRaw(content) as any),
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
  const [focused, setFocused] = useState(false);
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
      <Tooltip
        className={classNames({
          'eb-input--draft-text-area__display': !editing,
        })}
        title={translate('clickToEdit')}
        hidden={focused || !props.shy}
        onClick={() => {
          if (!editing) {
            setFocused(true);
          }
        }}
      >
        <Editor
          readOnly={!editing}
          uploadCallback={DoorwardApi.api.files.uploadFile}
          placeholder={props.placeholder || translate('inputPlaceholder')}
          wrapperClassName={editing && 'eb-input--draft-text-area__wrapper'}
          editorClassName={editing && 'eb-input--draft-text-area__editor'}
          toolbarClassName={editing && 'eb-input--draft-text-area__toolbar'}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          fullScreenParent={document.getElementById('modal-box')}
          onBlur={() => {
            formikProps.handleBlur({ target: { value, name } });
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          ref={editorRef}
        />
      </Tooltip>
      {children}
    </div>
  );
};
export interface DraftTextAreaProps extends InputProps {
  shy?: boolean;
}

export default withInput(DraftTextArea, [InputFeatures.LABEL], {}, false);
