import React from 'react';
import WebComponent from '../../../ui/WebComponent';
import Accordion from '../../../ui/Accordion';
import Header from '../../../ui/Header';
import AddModuleItemDropdown, { ModuleItemIcons } from '../../Dropdowns/AddModuleItemDropdown';
import { Course, Module, ModuleItem } from '../../../../services/models';
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
import EditableLabelForm from '../../Forms/EditableLabelForm';
import { reorderCourseModules, updateCourseModuleAction } from '../../../../reducers/courses/actions';
import { State } from '../../../../store';
import { useSelector } from 'react-redux';
import DragAndDropList from '../../../ui/DragAndDropList';
import ItemArray from '../../../ui/ItemArray';
import Panel from '../../../ui/Panel';
import { WebComponentState } from '../../../../reducers/reducers';
import DragAndDropListItem from '../../../ui/DragAndDropList/DragAndDropListItem';
import List from '../../../ui/List';
import ListItem from '../../../ui/List/ListItem';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Empty from '../../../ui/Empty';
import useModuleDrop from './useModuleDrop';
import useAction from '../../../../hooks/useActions';

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
