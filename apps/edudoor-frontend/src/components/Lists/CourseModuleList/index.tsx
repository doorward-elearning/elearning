import React from 'react';
import WebComponent from '@edudoor/ui/components/WebComponent';
import Accordion from '@edudoor/ui/components/Accordion';
import Header from '@edudoor/ui/components/Header';
import AddModuleItemDropdown, { ModuleItemIcons } from '../../Dropdowns/AddModuleItemDropdown';
import './CourseModuleList.scss';
import { Link } from 'react-router-dom';
import Row from '@edudoor/ui/components/Row';
import Icon from '@edudoor/ui/components/Icon';
import classNames from 'classnames';
import _ from 'lodash';
import IfElse from '@edudoor/ui/components/IfElse';
import EditableLabelForm from '../../Forms/EditableLabelForm';
import { useSelector } from 'react-redux';
import DragAndDropList from '@edudoor/ui/components/DragAndDropList';
import Panel from '@edudoor/ui/components/Panel';
import DragAndDropListItem from '@edudoor/ui/components/DragAndDropList/DragAndDropListItem';
import List from '@edudoor/ui/components/List';
import ListItem from '@edudoor/ui/components/List/ListItem';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Empty from '@edudoor/ui/components/Empty';
import useModuleDrop from './useModuleDrop';
import { reorderCourseModules, updateCourseModuleAction } from '../../../reducers/courses/actions';
import useRoutes from '../../../hooks/useRoutes';
import Tools from '@edudoor/ui/utils/Tools';
import { WebComponentState } from '@edudoor/ui/reducers/reducers';
import { Roles } from '@edudoor/ui/components/RolesManager';
import useAction from '@edudoor/ui/hooks/useActions';
import RoleContainer from '@edudoor/ui/components/RolesManager/RoleContainer';
import { State } from '../../../store';
import { Course, Module, ModuleItem } from '@edudoor/common/models';

const ModuleItemView: React.FunctionComponent<ModuleItemViewProps> = ({ moduleItem, module, index }) => {
  const routes = useRoutes();
  return (
    <DragAndDropListItem index={index} draggableId={moduleItem.id}>
      <ListItem>
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
    </DragAndDropListItem>
  );
};

const ModuleItemsList: React.FunctionComponent<{
  module: Module;
}> = ({ module }) => {
  return (
    <List>
      <Droppable droppableId={module.id}>
        {provided => (
          <div ref={provided.innerRef}>
            <IfElse condition={!module.items.length}>
              <React.Fragment>
                <Empty message="No Assignments, Pages, Quizzes etc." size="medium">
                  {provided.placeholder}
                </Empty>
              </React.Fragment>
              <React.Fragment>
                {module.items.map((moduleItem, index) => (
                  <ModuleItemView module={module} moduleItem={moduleItem} index={index} key={moduleItem.id} />
                ))}
                {provided.placeholder}
              </React.Fragment>
            </IfElse>
          </div>
        )}
      </Droppable>
    </List>
  );
};

const ModuleView: React.FunctionComponent<ModuleViewProps> = ({ module, updateModule }) => {
  return (
    <Panel>
      <Accordion
        title={(): JSX.Element => (
          <EditableLabelForm
            submitAction={updateCourseModuleAction}
            state={updateModule}
            createData={values => [module.id, values]}
            name="title"
            roles={[Roles.TEACHER]}
            value={module.title}
            component={<Header size={3} />}
          />
        )}
        action={(): JSX.Element => (
          <RoleContainer roles={[Roles.TEACHER]}>
            <AddModuleItemDropdown module={module} />
          </RoleContainer>
        )}
        open
      >
        <ModuleItemsList module={module} />
      </Accordion>
    </Panel>
  );
};

const CourseModuleList: React.FunctionComponent<CourseModuleListProps> = ({ course }) => {
  const updateModule = useSelector((state: State) => state.courses.updateModule);
  const action = useAction(reorderCourseModules);
  const [handleDrop] = useModuleDrop(course.id, action);

  return (
    <div className="course-module-list">
      <WebComponent data={course.modules} loading={false}>
        {(rawModules): JSX.Element => (
          <DragAndDropList droppableType="MODULES" items={rawModules} itemKey="id" handleDrop={handleDrop}>
            {(modules, state) => (
              <div className="module-list">
                {modules.map((module, index) => (
                  <DragAndDropListItem draggableId={module.id} index={index} key={module.id}>
                    <ModuleView index={index} module={module} updateModule={updateModule} droppableState={state} />
                  </DragAndDropListItem>
                ))}
              </div>
            )}
          </DragAndDropList>
        )}
      </WebComponent>
    </div>
  );
};

export interface CourseModuleListProps {
  course: Course;
}

export interface ModuleViewProps {
  index: number;
  module: Module;
  updateModule: WebComponentState<any>;
  droppableState: DroppableStateSnapshot;
}

export interface ModuleItemViewProps {
  module: Module;
  moduleItem: ModuleItem;
  index: number;
}

export default CourseModuleList;
