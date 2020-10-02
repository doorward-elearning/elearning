import React, { useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import './DraftHTMLContent.scss';
import handleDraftPagination from './handleDraftPagination';
import IfElse from '../IfElse';
import Pagination from '../Pagination';
import { ContentBlock, convertFromRaw, EditorState } from 'draft-js';
import classNames from 'classnames';
import createPlyrForYouTubeVideos from '@doorward/ui/components/DraftHTMLContent/createPlyrForYouTubeVideos';
import draftEditorWrapper from '@doorward/ui/hoc/draftEditorWrapper';

const DraftHTMLContent: React.FunctionComponent<DraftHTMLContentProps> = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const paginationPosition = props.paginationPosition || 'bottom';
  const [page, setPage] = useState(1);
  const [blocks, setBlocks] = useState<Array<Array<ContentBlock>>>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const content = JSON.parse(props.content);
    if (props.paginate) {
      setBlocks(handleDraftPagination(content));
    } else {
      setEditorState(EditorState.createWithContent(convertFromRaw(content)));
    }
  }, [props.content]);

  useEffect(() => {
    createPlyrForYouTubeVideos(editorRef.current);
  }, [props.content, editorRef]);

  useEffect(() => {
    if (blocks.length) {
      const temp = JSON.parse(props.content);
      temp.blocks = blocks[page - 1];
      setEditorState(EditorState.createWithContent(convertFromRaw(temp)));
    }
  }, [page, blocks]);

  return (
    <div
      className={classNames({
        'ed-draft-reader': true,
        [`stickyPagination__${props.stickyPagination}`]: true,
      })}
      ref={editorRef}
    >
      <IfElse condition={props.paginate && paginationPosition === 'top'}>
        <div className="pagination__top">
          <Pagination page={page} numPages={blocks.length} onChangePage={setPage} />
        </div>
      </IfElse>
      <div className="ed-draft-reader__editorWrapper">
        <Editor
          editorState={editorState}
          toolbarHidden
          readOnly
          wrapperClassName="ed-draft-reader__wrapper"
          editorClassName="ed-draft-reader__editor"
        />
      </div>
      <IfElse condition={props.paginate && paginationPosition === 'bottom'}>
        <div className="pagination__bottom">
          <Pagination page={page} numPages={blocks.length} onChangePage={setPage} />
        </div>
      </IfElse>
    </div>
  );
};

export interface DraftHTMLContentProps {
  content: string;
  paginate?: boolean;
  stickyPagination?: 'bottom' | 'top';
  paginationPosition?: 'bottom' | 'top';
}

export default draftEditorWrapper(DraftHTMLContent, 'content');
