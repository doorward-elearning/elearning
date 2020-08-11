import React from 'react';
import './UserPanel.scss';
import EImage from '../Image';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import useAuth from '../../hooks/useAuth';

const UserPanel: React.FunctionComponent<UserPanelProps> = ({ collapsed, profilePicture }) => {
  const { user } = useAuth();
  return (
    <div className={classNames({ 'sidebar-user-panel': true, collapsed })}>
      <div className="user-panel">
        <EImage src={profilePicture} alt="User Image" circle size="medium" />
        <div>
          <span>{user?.fullName}</span>
          <Link to="#" className="online-status">
            <span className="online">{user?.email}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export interface UserPanelProps {
  collapsed?: boolean;
  profilePicture?: string;
}

export default UserPanel;
