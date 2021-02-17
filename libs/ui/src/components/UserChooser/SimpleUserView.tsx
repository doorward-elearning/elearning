import React, { MouseEventHandler } from 'react';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import './SimpleUserView.scss';
import classNames from 'classnames';
import UserEntity from '@doorward/common/entities/user.entity';
import ProfilePicture from '@doorward/ui/components/ProfilePicture';

const SimpleUserView: React.FunctionComponent<SimpleUserViewProps> = (props): JSX.Element => {
  return (
    <Panel
      className={classNames({
        'simple-user-view': true,
        clickable: !!props.onClick,
      })}
      onClick={props.onClick}
    >
      <ProfilePicture user={props.user} />
      <div className="profile-info">
        <Header size={3}>{props.user.fullName}</Header>
        <span>{props.user.email}</span>
      </div>
      <div>{props.children}</div>
    </Panel>
  );
};

export interface SimpleUserViewProps {
  user: UserEntity;
  onClick?: MouseEventHandler;
}

export default SimpleUserView;
