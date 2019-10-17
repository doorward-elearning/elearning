import React from 'react';
import './UserPanel.scss';
import Image from '../Image';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

const UserPanel: React.FunctionComponent<UserPanelProps> = props => {
  return (
    <li className="sidebar-user-panel">
      <div className="user-panel">
        <Image src="../assets/img/dp.jpg" alt="User Image" circle size="large" />
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

export interface UserPanelProps {}

export default UserPanel;
