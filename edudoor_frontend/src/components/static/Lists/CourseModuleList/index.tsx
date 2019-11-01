import React from 'react';
import Card from '../../../ui/Card';
import WebComponent from '../../../ui/WebComponent';
import Accordion from '../../../ui/Accordion';
import Header from '../../../ui/Header';
import AddModuleItemDropdown from '../../Dropdowns/AddModuleItemDropdown';
import List from '../../../ui/List';
import ListItem from '../../../ui/List/ListItem';
import { Course } from '../../../../services/models';
import './CourseModuleList.scss';

const CourseModuleList: React.FunctionComponent<CourseModuleListProps> = ({ course }) => {
  return (
    <div className="course-module-list">
      <Card flat>
        <Card.Body>
          <WebComponent data={course.modules} loading={false}>
            {(modules): JSX.Element => (
              <div className="module-list">
                {modules.map((module, index) => {
                  return (
                    <Accordion
                      title={() => <Header size={3}>{module.title}</Header>}
                      action={() => <AddModuleItemDropdown />}
                      key={index}
                    >
                      <List>
                        <ListItem>
                          <Header size={3}>Kicking off with your new Team</Header>
                        </ListItem>
                        <List>
                          <ListItem>Remote calls Overview: Coach</ListItem>
                          <ListItem>Physical Environment on calls: Coach</ListItem>
                          <ListItem>Eyes on Remote Calls: Coach</ListItem>
                          <ListItem>Calm down with Breath: Coach</ListItem>
                          <ListItem>Speaking to be Understood</ListItem>
                          <ListItem>
                            <Header size={4}>Coach Calm Down with Breath (1).mp4</Header>
                          </ListItem>
                          <List>
                            <ListItem>
                              <a href="#">Output 1.1 Your Team Kickoff Call -- Again!</a>
                            </ListItem>
                          </List>
                        </List>
                      </List>
                    </Accordion>
                  );
                })}
              </div>
            )}
          </WebComponent>
        </Card.Body>
      </Card>
    </div>
  );
};

export interface CourseModuleListProps {
  course: Course;
}

export default CourseModuleList;
