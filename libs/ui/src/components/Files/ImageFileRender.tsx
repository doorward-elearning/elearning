import React from 'react';

const ImageFileRender: React.FunctionComponent<ImageFileRenderProps> = (props): JSX.Element => {
  return <img src={props.source} alt="" />;
};

export interface ImageFileRenderProps {
  source: string;
}

export default ImageFileRender;
