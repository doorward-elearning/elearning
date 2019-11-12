import React from 'react';
import Dropdown from '../../../ui/Dropdown';
import Icon from '../../../ui/Icon';

const CourseViewMenu: React.FunctionComponent<CourseViewMenuProps> = props => {
  return (
    <Dropdown positionX="right">
      <Icon icon="more_vert" />
      <Dropdown.Menu>
        <Dropdown.Item icon="account_circle">Participants</Dropdown.Item>
        <Dropdown.Item icon="event">Calendar</Dropdown.Item>
        <Dropdown.Item icon="settings">Settings</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export interface CourseViewMenuProps {}

export default CourseViewMenu;
