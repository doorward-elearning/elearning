import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import fullEditor from '../Input/tools/editorTools';
import './DraftHTMLContent.scss';

const DraftHTMLContent: React.FunctionComponent<DraftHTMLContentProps> = props => {
  return (
    <Editor
      toolbar={fullEditor}
      contentState={props.content}
      toolbarHidden
      readOnly
      wrapperClassName="ed-draft-reader__wrapper"
      editorClassName="ed-draft-reader__editor"
    />
  );
};

export interface DraftHTMLContentProps {
  content: any;
}

export default DraftHTMLContent;
