import React, { FunctionComponent } from 'react';

const HtmlContent: FunctionComponent<HTMLContentProps> = (props): JSX.Element => {
  return <div dangerouslySetInnerHTML={{ __html: props.html || '' }} />;
};

export interface HTMLContentProps {
  html?: string;
}
export default HtmlContent;
