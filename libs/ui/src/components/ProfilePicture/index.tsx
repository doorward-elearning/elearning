import React from 'react';
import './ProfilePicture.scss';
import Tools from '@doorward/common/utils/Tools';
import Dropdown from '@doorward/ui/components/Dropdown';
import UserInfoCard from '@doorward/ui/components/ProfilePicture/UserInfoCard';
import UserEntity from '@doorward/common/entities/user.entity';

const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = (props): JSX.Element => {
  const width = props.width || 50;
  const height = props.height || 50;
  return props.user ? (
    <Dropdown openOnHover disabled={props.hideUserInfo}>
      <div className="ed-profilePicture">
        {props.user?.profilePicture ? (
          <img src={props.user.profilePicture} alt="" style={{ width, height }} />
        ) : (
          <div
            style={{
              background: Tools.color(props.user.fullName),
              width,
              height,
              fontSize: height / 2.5,
            }}
            className="profile-picture-letter"
          >
            {props.user.fullName.toUpperCase().charAt(0)}
          </div>
        )}
      </div>
      {props.user.id && <UserInfoCard user={props.user as UserEntity} />}
    </Dropdown>
  ) : null;
};

ProfilePicture.defaultProps = {
  hideUserInfo: true,
};

export interface ProfilePictureUser {
  profilePicture?: string;
  fullName: string;
  id?: string;
}

export interface ProfilePictureProps {
  user: ProfilePictureUser | UserEntity;
  width?: number;
  height?: number;
  hideUserInfo?: boolean;
}

export default ProfilePicture;
