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
import { Link } from 'react-router-dom';
import useRoutes from '../../../../hooks/useRoutes';

const CourseModuleList: React.FunctionComponent<CourseModuleListProps> = ({ course }) => {
  const routes = useRoutes();
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
                      open
                    >
                      <WebComponent
                        data={module.items}
                        loading={false}
                        message="This module does not have any items yet."
                        size="medium"
                      >
                        {(moduleItems): JSX.Element => (
                          <List>
                            {moduleItems.map(moduleItem => (
                              <ListItem key={moduleItem.id}>
                                <Link
                                  to={routes.routes.viewModuleItem.withParams({
                                    itemId: moduleItem.id,
                                    moduleId: module.id,
                                    courseId: module.courseId,
                                  })}
                                >
                                  {moduleItem.title}
                                </Link>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </WebComponent>
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
