import React, { useState } from 'react';
import WebComponent from '@doorward/ui/components/WebComponent';
import Accordion from '@doorward/ui/components/Accordion';
import Header from '@doorward/ui/components/Header';
import AddModuleItemDropdown, { ModuleItemIcons } from '../../Dropdowns/AddModuleItemDropdown';
import './CourseModuleList.scss';
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
import useAction from '@doorward/ui/hooks/useActions';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import useModal from '@doorward/ui/hooks/useModal';
import WebConfirmModal from '@doorward/ui/components/ConfirmModal/WebConfirmModal';
import ModuleEntity from '@doorward/common/entities/module.entity';
import DoorwardApi from '../../../services/apis/doorward.api';
import CourseEntity from '@doorward/common/entities/course.entity';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import Tools from '@doorward/common/utils/Tools';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import { ApiActionCreator, WebComponentState } from 'use-api-action/types/types';
import ROUTES from '@doorward/common/frontend/routes/main';
import NavLink from '@doorward/ui/components/NavLink';

const ModuleItemView: React.FunctionComponent<ModuleItemViewProps> = ({ moduleItem, module, index, courseId }) => {
  const hasPrivileges = usePrivileges();
  return (
    <DragAndDropListItem isDragDisabled={!hasPrivileges('modules.update')} index={index} draggableId={moduleItem.id}>
      <ListItem>
        <NavLink
          className={classNames({
            'course-module-item': true,
            [_.camelCase(moduleItem.type.toLowerCase())]: true,
          })}
          to={ROUTES.courses.modules.items.view}
          params={{ itemId: moduleItem.id }}
        >
          <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Row style={{ justifyContent: 'start' }}>
              <Icon icon={ModuleItemIcons[moduleItem.type]} />
              {moduleItem.title}
            </Row>
            {moduleItem.type === ModuleItemType.ASSIGNMENT && (
              <span className="meta">
                {translate('dueOn', {
                  date: Tools.shortDateTime((moduleItem as AssignmentEntity)?.options?.dueDate),
                })}
              </span>
            )}
          </Row>
        </NavLink>
      </ListItem>
    </DragAndDropListItem>
  );
};

const ModuleItemsList: React.FunctionComponent<{
  module: ModuleEntity;
  courseId: string;
}> = ({ module, courseId }) => {
  return (
    <List>
      <Droppable droppableId={module.id}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {module.items?.length ? (
              <React.Fragment>
                {module.items.map((moduleItem, index) => (
                  <ModuleItemView
                    courseId={courseId}
                    module={module}
                    moduleItem={moduleItem}
                    index={index}
                    key={moduleItem.id}
                  />
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

const ModuleView: React.FunctionComponent<ModuleViewProps> = ({
  module,
  updateModuleState,
  updateModule,
  onDelete,
  courseId,
}) => {
  return (
    <Panel>
      <Accordion
        title={(): JSX.Element => (
          <EditableLabelForm
            submitAction={updateModule}
            state={updateModuleState}
            createData={(values) => [module.id, values]}
            name="title"
            privileges={['modules.update']}
            value={module.title}
            component={<Header size={3} />}
          />
        )}
        action={(): JSX.Element => (
          <Row>
            <RoleContainer privileges={['modules.update']}>
              <AddModuleItemDropdown module={module} courseId={courseId} />
            </RoleContainer>
            <RoleContainer privileges={['modules.delete']}>
              <Icon onClick={onDelete} icon="delete" />
            </RoleContainer>
          </Row>
        )}
        open
      >
        <ModuleItemsList module={module} courseId={courseId} />
      </Accordion>
    </Panel>
  );
};

const CourseModuleList: React.FunctionComponent<CourseModuleListProps> = ({ course }) => {
  const [updateModule, updateModuleState] = useApiAction(DoorwardApi, (api) => api.modules.updateModule);
  const action = useAction(DoorwardApi.actions.modules.updateCourseModules);
  const hasPrivileges = usePrivileges();
  const [handleDrop] = useModuleDrop(course.id, action);
  const [deleteModule, deleteModuleState] = useApiAction(DoorwardApi, (api) => api.modules.deleteModule);
  const deleteModuleModal = useModal();
  const [moduleToDelete, setModuleToDelete] = useState();

  return (
    <div className="course-module-list">
      <WebConfirmModal
        args={[moduleToDelete]}
        title={translate('deleteModule')}
        useModal={deleteModuleModal}
        action={deleteModule}
        state={deleteModuleState}
      >
        <p>{translate('areYouSureYouWantToDeleteModule')}</p>
      </WebConfirmModal>
      <WebComponent data={course.modules} loading={false}>
        {(rawModules): JSX.Element => (
          <DragAndDropList droppableType="MODULES" items={rawModules} itemKey="id" handleDrop={handleDrop}>
            {(modules, state) => (
              <div className="module-list">
                {modules.map((module, index) => (
                  <DragAndDropListItem
                    isDragDisabled={!hasPrivileges('modules.update')}
                    draggableId={module.id}
                    index={index}
                    key={module.id}
                  >
                    <ModuleView
                      onDelete={() => {
                        setModuleToDelete(module.id);
                        deleteModuleModal.openModal();
                      }}
                      courseId={course.id}
                      index={index}
                      module={module}
                      updateModuleState={updateModuleState}
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
  updateModuleState: WebComponentState<any>;
  updateModule: ApiActionCreator;
  droppableState: DroppableStateSnapshot;
  courseId: string;
  onDelete: () => void;
}

export interface ModuleItemViewProps {
  module: ModuleEntity;
  moduleItem: ModuleItemEntity;
  index: number;
  courseId: string;
}

export default CourseModuleList;
