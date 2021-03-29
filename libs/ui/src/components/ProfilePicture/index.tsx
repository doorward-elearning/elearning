import React, { useState } from 'react';
import './ProfilePicture.scss';
import Dropdown from '@doorward/ui/components/Dropdown';
import UserInfoCard from '@doorward/ui/components/ProfilePicture/UserInfoCard';
import UserEntity from '@doorward/common/entities/user.entity';
import LetterIcon from '@doorward/ui/components/LetterIcon';

const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = (props): JSX.Element => {
  const width = props.width || 50;
  const height = props.height || 50;

  const [showImage, setShowImage] = useState<boolean>(!!props.user?.profilePicture);

  return props.user ? (
    <Dropdown openOnHover disabled={props.hideUserInfo}>
      <div className="ed-profilePicture">
        {showImage ? (
          <img
            src={props.user.profilePicture}
            loading="lazy"
            onError={() => setShowImage(false)}
            alt=""
            style={{ width, height }}
          />
        ) : (
          <LetterIcon word={props.user.fullName} width={width} height={height} />
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
