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
                      title={(): JSX.Element => <Header size={3}>{module.title}</Header>}
                      action={(): JSX.Element => <AddModuleItemDropdown module={module} />}
                      key={index}
                    >
                      <List>
                        {module.items.map(moduleItem => (
                          <ListItem key={moduleItem.id}>{moduleItem.title}</ListItem>
                        ))}
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
