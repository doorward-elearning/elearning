import React from 'react';
import './Anchor.scss';
import Icon from '@doorward/ui/components/Icon';

const Anchor: React.FunctionComponent<AnchorProps> = (props): JSX.Element => {
  return (
    <a {...props} className="ed-anchor">
      {props.children}
      {props.target === '_blank' && <Icon icon="tab" className="new-tab-icon" />}
    </a>
  );
};

export interface AnchorProps
  extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

export default Anchor;
