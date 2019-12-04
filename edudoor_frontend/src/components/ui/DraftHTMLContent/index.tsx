import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import './DraftHTMLContent.scss';
import useDraftPagination from './useDraftPagination';
import IfElse from '../IfElse';
import Pagination from '../Pagination';
import { ContentBlock, convertFromRaw, EditorState } from 'draft-js';

const DraftHTMLContent: React.FunctionComponent<DraftHTMLContentProps> = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [page, setPage] = useState(1);
  const [blocks, setBlocks] = useState<Array<Array<ContentBlock>>>([]);
  useEffect(() => {
    setBlocks(useDraftPagination(props.content));
  }, [props.content]);

  useEffect(() => {
    if (blocks.length) {
      const temp = props.content;
      temp.blocks = blocks[page - 1];
      setEditorState(EditorState.createWithContent(convertFromRaw(temp)));
    }
  }, [page, blocks]);

  return (
    <React.Fragment>
      <IfElse condition={props.paginate}>
        <Pagination page={page} numPages={blocks.length} onChangePage={setPage} />
      </IfElse>
      <Editor
        editorState={editorState}
        toolbarHidden
        readOnly
        wrapperClassName="ed-draft-reader__wrapper"
        editorClassName="ed-draft-reader__editor"
      />
      <IfElse condition={props.paginate}>
        <Pagination page={page} numPages={blocks.length} onChangePage={setPage} />
      </IfElse>
    </React.Fragment>
  );
};

export interface DraftHTMLContentProps {
  content: any;
  paginate?: boolean;
}

export default DraftHTMLContent;
