import React, { FunctionComponent } from 'react';
import UserEntity from '@doorward/common/entities/user.entity';

const SimpleProfileView: FunctionComponent<SimpleProfileViewProps> = (props): JSX.Element => {
  return <div className="simple-profile-view"></div>;
};

export interface SimpleProfileViewProps {
  user: UserEntity;
}

export default SimpleProfileView;
