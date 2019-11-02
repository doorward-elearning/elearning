import React from 'react';
import List from '../../ui/List';
import ListItem from '../../ui/List/ListItem';
import Header from '../../ui/Header';
import Button from '../../ui/Buttons/Button';
import Row from '../../ui/Row';
import './CourseViewSidebar.scss';
import Accordion from '../../ui/Accordion';
import Empty from '../../ui/Empty';
import { UseModal } from '../../../hooks/useModal';

const CourseViewSidebar: React.FunctionComponent<CourseViewSidebarProps> = props => {
  return (
    <div className="course-view-sidebar">
      <List>
        <ListItem>
          <Row style={{ justifyContent: 'space-between' }}>
            <Header size={3}>Student List</Header>
            <Button mini bordered icon="add" onClick={props.addStudentModal.openModal} />
          </Row>
        </ListItem>
        <ListItem>Moses Gitau</ListItem>
        <ListItem>Edward Njoroge</ListItem>
        <ListItem>Basil</ListItem>
        <ListItem>
          <a href="#">View all</a>
        </ListItem>
      </List>
      <Button icon="add">New Manager</Button>
      <Button icon="video_call" bordered>
        Live classroom
      </Button>
      <Accordion title={() => <Header size={5}>Course Settings</Header>}>
        <Empty size="medium" />
      </Accordion>
      <Accordion open title={() => <Header size={5}>Announcement Calendar</Header>}>
        <Empty icon="event" size="medium" />
      </Accordion>
    </div>
  );
};

export interface CourseViewSidebarProps {
  addStudentModal: UseModal;
}

export default CourseViewSidebar;
