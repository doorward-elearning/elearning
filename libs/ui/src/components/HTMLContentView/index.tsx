import React, { useEffect, useRef } from 'react';
import './DraftHTMLContent.scss';
import classNames from 'classnames';
import createPlyrForYouTubeVideos from '@doorward/ui/components/HTMLContentView/createPlyrForYouTubeVideos';

const HTMLContentView: React.FunctionComponent<DraftHTMLContentProps> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createPlyrForYouTubeVideos(editorRef.current);
  }, [props.content, editorRef]);

  return (
    <div
      className={classNames({
        'ed-draft-reader': true,
        [`stickyPagination__${props.stickyPagination}`]: true,
      })}
      ref={editorRef}
    >
      <div className="ed-draft-reader__editorWrapper" dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  );
};

export interface DraftHTMLContentProps {
  content: string;
  paginate?: boolean;
  stickyPagination?: 'bottom' | 'top';
  paginationPosition?: 'bottom' | 'top';
}

export default HTMLContentView;
