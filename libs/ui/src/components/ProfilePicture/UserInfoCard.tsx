import React from 'react';
import UserEntity from '@doorward/common/entities/user.entity';
import './UserInfoCard.scss';

const UserInfoCard: React.FunctionComponent<UserInfoCardProps> = (props): JSX.Element => {
  return <div className="ed-user-info-card"></div>;
};

export interface UserInfoCardProps {
  user: UserEntity;
}

export default UserInfoCard;
