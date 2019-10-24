import React from 'react';
import './UserPanel.scss';
import Image from '../Image';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import profile from '../../../assets/images/profile.svg';
import classNames from 'classnames';

const UserPanel: React.FunctionComponent<UserPanelProps> = ({ collapsed }) => {
  return (
    <li className={classNames({ 'sidebar-user-panel': true, collapsed })}>
      <div className="user-panel">
        <Image src={profile} alt="User Image" circle size="large" />
        <div>
          <span>Moses Gitau</span>
          <Link to="#" className="online-status">
            <Icon icon="brightness_1" />
            <span className="online">Online</span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export interface UserPanelProps {
  collapsed?: boolean;
}

export default UserPanel;
