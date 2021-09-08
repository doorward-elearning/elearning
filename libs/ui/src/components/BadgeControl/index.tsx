import React from 'react';
import './BadgeControl.scss';
import Badge from '@doorward/ui/components/Badge';
import Icon from '../Icon';

const BadgeControl: React.FunctionComponent<BadgeControlProps> = (props): JSX.Element => {
  return (
    <div className="ed-badge-control">
      <div className="ed-badge-control_parent">{props.children}</div>
      {props.value ? <Badge className="ed-badge-control__badge">{props.value}</Badge> : null}
      {props.bookmark ? <Icon className="ed-badge-control__bookmarkIcon" icon="bookmark" /> : null}
    </div>
  );
};

export interface BadgeControlProps {
  value: string | number;
  bookmark?: boolean;
}

export default BadgeControl;
