import React from 'react';

const ImageFileRender: React.FunctionComponent<ImageFileRenderProps> = (props): JSX.Element => {
  return (
    <div style={{ width: 'auto', height: 'auto' }}>
      <img src={props.source} alt="" />
    </div>
  );
};

export interface ImageFileRenderProps {
  source: string;
}

export default ImageFileRender;
