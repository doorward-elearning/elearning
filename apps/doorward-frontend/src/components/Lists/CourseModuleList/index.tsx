import React, { useState } from 'react';
import WebComponent from '@doorward/ui/components/WebComponent';
import Accordion from '@doorward/ui/components/Accordion';
import Header from '@doorward/ui/components/Header';
import AddModuleItemDropdown, { ModuleItemIcons } from '../../Dropdowns/AddModuleItemDropdown';
import './CourseModuleList.scss';
import { Link } from 'react-router-dom';
import Row from '@doorward/ui/components/Row';
import Icon from '@doorward/ui/components/Icon';
import classNames from 'classnames';
import _ from 'lodash';
import IfElse from '@doorward/ui/components/IfElse';
import EditableLabelForm from '../../Forms/EditableLabelForm';
import { useSelector } from 'react-redux';
import DragAndDropList from '@doorward/ui/components/DragAndDropList';
import Panel from '@doorward/ui/components/Panel';
import DragAndDropListItem from '@doorward/ui/components/DragAndDropList/DragAndDropListItem';
import List from '@doorward/ui/components/List';
import ListItem from '@doorward/ui/components/List/ListItem';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Empty from '@doorward/ui/components/Empty';
import useModuleDrop from './useModuleDrop';
import {
  deleteCourseModuleAction,
  reorderCourseModules,
  updateCourseModuleAction,
} from '../../../reducers/courses/actions';
import useRoutes from '../../../hooks/useRoutes';
import Tools from '@doorward/common/utils/Tools';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import { Roles } from '@doorward/ui/components/RolesManager';
import useAction from '@doorward/ui/hooks/useActions';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { State } from '../../../store';
import { Module } from '@doorward/common/models/Module';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import { Course } from '@doorward/common/models/Course';
import useRoleManager from '@doorward/ui/hooks/useRoleManager';
import Button from '@doorward/ui/components/Buttons/Button';
import ConfirmModal from '@doorward/ui/components/ConfirmModal';
import useModal from '@doorward/ui/hooks/useModal';
import useRequestModal from '@doorward/ui/hooks/useRequestModal';
import WebConfirmModal from '@doorward/ui/components/ConfirmModal/WebConfirmModal';

const ModuleItemView: React.FunctionComponent<ModuleItemViewProps> = ({ moduleItem, module, index }) => {
  const routes = useRoutes();
  const hasRole = useRoleManager([Roles.MODERATOR]);
  return (
    <DragAndDropListItem isDragDisabled={!hasRole} index={index} draggableId={moduleItem.id}>
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

const ModuleView: React.FunctionComponent<ModuleViewProps> = ({ module, updateModule, onDelete }) => {
  return (
    <Panel>
      <Accordion
        title={(): JSX.Element => (
          <EditableLabelForm
            submitAction={updateCourseModuleAction}
            state={updateModule}
            createData={values => [module.id, values]}
            name="title"
            roles={[Roles.MODERATOR]}
            value={module.title}
            component={<Header size={3} />}
          />
        )}
        action={(): JSX.Element => (
          <RoleContainer roles={[Roles.MODERATOR]}>
            <Row>
              <AddModuleItemDropdown module={module} />
              <Icon onClick={onDelete} icon="delete" />
            </Row>
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
  const hasRole = useRoleManager([Roles.MODERATOR]);
  const [handleDrop] = useModuleDrop(course.id, action);
  const state = useSelector((state: State) => state.courses.deleteModule);
  const deleteModuleModal = useModal();
  const [moduleToDelete, setModuleToDelete] = useState();

  return (
    <div className="course-module-list">
      <WebConfirmModal
        args={[moduleToDelete]}
        title="Delete Module"
        useModal={deleteModuleModal}
        action={deleteCourseModuleAction}
        state={state}
      >
        <p>Are you sure you want to delete this module?</p>
      </WebConfirmModal>
      <WebComponent data={course.modules} loading={false}>
        {(rawModules): JSX.Element => (
          <DragAndDropList droppableType="MODULES" items={rawModules} itemKey="id" handleDrop={handleDrop}>
            {(modules, state) => (
              <div className="module-list">
                {modules.map((module, index) => (
                  <DragAndDropListItem isDragDisabled={!hasRole} draggableId={module.id} index={index} key={module.id}>
                    <ModuleView
                      onDelete={() => {
                        setModuleToDelete(module.id);
                        deleteModuleModal.openModal();
                      }}
                      index={index}
                      module={module}
                      updateModule={updateModule}
                      droppableState={state}
                    />
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
  onDelete: () => void;
}

export interface ModuleItemViewProps {
  module: Module;
  moduleItem: ModuleItem;
  index: number;
}

export default CourseModuleList;
