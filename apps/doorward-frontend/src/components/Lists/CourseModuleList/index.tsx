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
import EditableLabelForm from '../../Forms/EditableLabelForm';
import DragAndDropList from '@doorward/ui/components/DragAndDropList';
import Panel from '@doorward/ui/components/Panel';
import DragAndDropListItem from '@doorward/ui/components/DragAndDropList/DragAndDropListItem';
import List from '@doorward/ui/components/List';
import ListItem from '@doorward/ui/components/List/ListItem';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Empty from '@doorward/ui/components/Empty';
import useModuleDrop from './useModuleDrop';
import useRoutes from '../../../hooks/useRoutes';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import { Roles } from '@doorward/common/types/roles';
import useAction from '@doorward/ui/hooks/useActions';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import useRoleManager from '@doorward/ui/hooks/useRoleManager';
import useModal from '@doorward/ui/hooks/useModal';
import WebConfirmModal from '@doorward/ui/components/ConfirmModal/WebConfirmModal';
import ModuleEntity from '@doorward/common/entities/module.entity';
import DoorwardApi from '../../../services/apis/doorward.api';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import CourseEntity from '@doorward/common/entities/course.entity';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import Tools from '@doorward/common/utils/Tools';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';

const ModuleItemView: React.FunctionComponent<ModuleItemViewProps> = ({ moduleItem, module, index }) => {
  const routes = useRoutes();
  const hasRole = useRoleManager([Roles.TEACHER]);
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
            courseId: module?.course?.id,
          })}
        >
          <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Row style={{ justifyContent: 'start' }}>
              <Icon icon={ModuleItemIcons[moduleItem.type]} />
              {moduleItem.title}
            </Row>
            {moduleItem.type === ModuleItemType.ASSIGNMENT && (
              <span className="meta">
                Due: {Tools.shortDateTime((moduleItem as AssignmentEntity)?.options?.dueDate)}
              </span>
            )}
          </Row>
        </Link>
      </ListItem>
    </DragAndDropListItem>
  );
};

const ModuleItemsList: React.FunctionComponent<{
  module: ModuleEntity;
}> = ({ module }) => {
  return (
    <List>
      <Droppable droppableId={module.id}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {module.items?.length ? (
              <React.Fragment>
                {module.items.map((moduleItem, index) => (
                  <ModuleItemView module={module} moduleItem={moduleItem} index={index} key={moduleItem.id} />
                ))}
                {provided.placeholder}
              </React.Fragment>
            ) : (
              <Empty message="No Assignments, Pages, Quizzes etc." size="medium">
                {provided.placeholder}
              </Empty>
            )}
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
            submitAction={DoorwardApi.modules.updateModule}
            state={updateModule}
            createData={(values) => [module.id, values]}
            name="title"
            roles={[Roles.TEACHER]}
            value={module.title}
            component={<Header size={3} />}
          />
        )}
        action={(): JSX.Element => (
          <RoleContainer roles={[Roles.TEACHER]}>
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
  const updateModule = useDoorwardApi((state) => state.modules.updateModule);
  const action = useAction(DoorwardApi.modules.updateCourseModules);
  const hasRole = useRoleManager([Roles.TEACHER]);
  const [handleDrop] = useModuleDrop(course.id, action);
  const state = useDoorwardApi((state) => state.modules.deleteModule);
  const deleteModuleModal = useModal();
  const [moduleToDelete, setModuleToDelete] = useState();

  return (
    <div className="course-module-list">
      <WebConfirmModal
        args={[moduleToDelete]}
        title="Delete Module"
        useModal={deleteModuleModal}
        action={DoorwardApi.modules.deleteModule}
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
  course: CourseEntity;
}

export interface ModuleViewProps {
  index: number;
  module: ModuleEntity;
  updateModule: WebComponentState<any>;
  droppableState: DroppableStateSnapshot;
  onDelete: () => void;
}

export interface ModuleItemViewProps {
  module: ModuleEntity;
  moduleItem: ModuleItemEntity;
  index: number;
}

export default CourseModuleList;
