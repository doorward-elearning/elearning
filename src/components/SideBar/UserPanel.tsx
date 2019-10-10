import React from 'react';

const UserPanel: React.FunctionComponent<UserPanelProps> = props => {
  return (
    <li className="sidebar-user-panel">
      <div className="user-panel">
        <div className="pull-left image">
          <img src="../assets/img/dp.jpg" className="img-circle user-img-circle" alt="User Image" />
        </div>
        <div className="pull-left info">
          <p>Moses Gitau</p>
          <a href="#">
            <i className="fa fa-circle user-online" />
            <span className="txtOnline">Online</span>
          </a>
        </div>
      </div>
    </li>
  );
};

export interface UserPanelProps {}

export default UserPanel;
