import React from 'react';
import EImage from '@edudoor/ui/components/Image';
import profile from '../../../assets/images/profile.svg';

const SimpleUserView: React.FunctionComponent<SimpleUserViewProps> = (props): JSX.Element => {
  return (
    <div className="simple-user-view">
      <EImage src={profile} size="medium" />
    </div>
  );
};

export interface SimpleUserViewProps {}

export default SimpleUserView;
