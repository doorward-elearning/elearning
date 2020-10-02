import React, { MouseEventHandler } from 'react';
import EImage from '@doorward/ui/components/Image';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import profile from '../../../assets/images/profile.svg';
import './SimpleUserView.scss';
import classNames from 'classnames';
import UserEntity from '@doorward/common/entities/user.entity';

const SimpleUserView: React.FunctionComponent<SimpleUserViewProps> = (props): JSX.Element => {
  return (
    <Panel
      className={classNames({
        'simple-user-view': true,
        clickable: !!props.onClick,
      })}
      onClick={props.onClick}
    >
      <EImage src={profile} size="medium" />
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
