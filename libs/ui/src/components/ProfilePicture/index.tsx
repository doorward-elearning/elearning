import React from 'react';
import './ProfilePicture.scss';
import Tools from '@doorward/common/utils/Tools';

const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = (props): JSX.Element => {
  const width = props.width || 50;
  const height = props.height || 50;
  return props.user ? (
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
  ) : null;
};

export interface ProfilePictureUser {
  profilePicture?: string;
  fullName: string;
  id?: string;
}

export interface ProfilePictureProps {
  user: ProfilePictureUser;
  width?: number;
  height?: number;
}

export default ProfilePicture;
