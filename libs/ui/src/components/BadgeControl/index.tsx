import React from 'react';
import './BadgeControl.scss';
import Badge from '@doorward/ui/components/Badge';

const BadgeControl: React.FunctionComponent<BadgeControlProps> = (props): JSX.Element => {
  return (
    <div className="ed-badge-control">
      <div className="ed-badge-control_parent">{props.children}</div>
      {props.value ? <Badge className="ed-badge-control__badge">{props.value}</Badge> : null}
    </div>
  );
};

export interface BadgeControlProps {
  value: string | number;
}

export default BadgeControl;
