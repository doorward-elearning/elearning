import React, { FunctionComponent } from 'react';

const HtmlContent: FunctionComponent<HTMLContentProps> = (props): JSX.Element => {
  return (
    <div
      className="ed-htmlContent"
      dangerouslySetInnerHTML={{ __html: props.html || '' }}
      style={{ background: 'white', padding: 'var(--padding)' }}
    />
  );
};

export interface HTMLContentProps {
  html?: string;
}
export default HtmlContent;
