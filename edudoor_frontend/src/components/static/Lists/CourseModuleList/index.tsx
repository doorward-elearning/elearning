import React from 'react';
import Card from '../../../ui/Card';
import WebComponent from '../../../ui/WebComponent';
import Accordion from '../../../ui/Accordion';
import Header from '../../../ui/Header';
import AddModuleItemDropdown, { ModuleItemIcons } from '../../Dropdowns/AddModuleItemDropdown';
import List from '../../../ui/List';
import ListItem from '../../../ui/List/ListItem';
import { Course, Module } from '../../../../services/models';
import './CourseModuleList.scss';
import { Link } from 'react-router-dom';
import useRoutes from '../../../../hooks/useRoutes';
import RoleContainer from '../../RolesManager/RoleContainer';
import { Roles } from '../../RolesManager';
import Row from '../../../ui/Row';
import Icon from '../../../ui/Icon';
import classNames from 'classnames';
import _ from 'lodash';
import Tools from '../../../../utils/Tools';
import IfElse from '../../../ui/IfElse';

const ModuleItemsList: React.FunctionComponent<{
  module: Module;
}> = ({ module }) => {
  const routes = useRoutes();
  return (
    <WebComponent data={module.items} loading={false} message="This module does not have any items yet." size="medium">
      {(moduleItems): JSX.Element => (
        <List>
          {moduleItems.map(moduleItem => (
            <ListItem key={moduleItem.id}>
              <Link
                className={classNames({
                  'course-module-item': true,
                  [_.camelCase(moduleItem.type.toLowerCase())]: true,
                })}
                to={routes.routes.viewModuleItem.withParams({
                  itemId: moduleItem.id,
                  moduleId: module.id,
                  courseId: module.courseId,
                })}
              >
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Row style={{ justifyContent: 'start' }}>
                    <Icon icon={ModuleItemIcons[moduleItem.type]} />
                    {moduleItem.title}
                  </Row>
                  <IfElse condition={moduleItem.type === 'Assignment'}>
                    <span className="meta">Due: {Tools.shortDateTime(moduleItem.content.dueDate)}</span>
                  </IfElse>
                </Row>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </WebComponent>
  );
};

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
                      action={(): JSX.Element => (
                        <RoleContainer roles={[Roles.TEACHER]}>
                          <AddModuleItemDropdown module={module} />
                        </RoleContainer>
                      )}
                      key={index}
                      open
                    >
                      <ModuleItemsList module={module} />
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
