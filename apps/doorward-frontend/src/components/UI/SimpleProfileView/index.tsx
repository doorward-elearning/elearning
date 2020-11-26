import React, { FunctionComponent } from 'react';
import UserModel from '@doorward/common/models/user.model';

const SimpleProfileView: FunctionComponent<SimpleProfileViewProps> = (props): JSX.Element => {
  return <div className="simple-profile-view"></div>;
};

export interface SimpleProfileViewProps {
  user: UserModel;
}

export default SimpleProfileView;
