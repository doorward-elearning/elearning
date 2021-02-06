import React from 'react';
import { ContentState } from 'draft-js';

const Embed: React.FunctionComponent<{ block: Record<string, any>; contentState: ContentState }> = ({
  block,
  contentState,
}) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, height, width } = entity.getData();
  return (
    <iframe height={height} width={width} src={src} frameBorder="0" allowFullScreen title="Wysiwyg Embedded Content" />
  );
};
export default Embed;
