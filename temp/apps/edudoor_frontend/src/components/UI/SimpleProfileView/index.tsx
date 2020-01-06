import React, { FunctionComponent } from 'react';
import { User } from '../../../../../../libs/shared/models';

const SimpleProfileView: FunctionComponent<SimpleProfileViewProps> = (props): JSX.Element => {
  return <div className="simple-profile-view"></div>;
};

export interface SimpleProfileViewProps {
  user: User;
}

export default SimpleProfileView;
