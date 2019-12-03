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
import { updateCourseModuleAction } from '../../../../reducers/courses/actions';
import { State } from '../../../../store';
import { useSelector } from 'react-redux';
import DragAndDropList from '../../../ui/DragAndDropList';
import ItemArray from '../../../ui/ItemArray';
import Panel from '../../../ui/Panel';
import { WebComponentState } from '../../../../reducers/reducers';
import DragAndDropListItem from '../../../ui/DragAndDropList/DragAndDropListItem';
import List from '../../../ui/List';
import ListItem from '../../../ui/List/ListItem';
import { Droppable, DropResult } from 'react-beautiful-dnd';
import Empty from '../../../ui/Empty';

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
                <ItemArray data={module.items}>
                  {(moduleItem, index) => <ModuleItemView module={module} moduleItem={moduleItem} index={index} />}
                </ItemArray>
                {provided.placeholder}
              </React.Fragment>
            </IfElse>
          </div>
        )}
      </Droppable>
    </List>
  );
};

const ModuleView: React.FunctionComponent<ModuleViewProps> = ({ index, module, updateModule }) => {
  return (
    <Panel>
      <Accordion
        title={(): JSX.Element => (
          <EditableLabelForm
            submitAction={updateCourseModuleAction}
            state={updateModule}
            createData={values => [module.id, values]}
            name="title"
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

  const handleDrop = (dropResult: DropResult, items: Array<Module>) => {
    if (dropResult.type === 'MODULES') {
      return Tools.handleReorder(items, 'id', dropResult);
    } else {
      const newItems = [...items];
      console.log(newItems);
      if (dropResult.destination) {
        const sourceModule = newItems.findIndex(m => m.id === dropResult.source.droppableId);
        const destinationModule = newItems.findIndex(m => m.id === dropResult.destination?.droppableId);

        const moduleItem = newItems[sourceModule].items.find(item => item.id === dropResult.draggableId);

        if (sourceModule === destinationModule) {
          const module = newItems[sourceModule];
          module.items = Tools.handleReorder(module.items, 'id', dropResult);
          newItems[sourceModule] = module;
        } else {
          newItems[sourceModule].items = newItems[sourceModule].items.filter(
            item => item.id !== dropResult.draggableId
          );
          if (moduleItem) {
            newItems[destinationModule].items.splice(dropResult.destination.index, 0, moduleItem);
          }
        }
      }
      return newItems;
    }
  };
  return (
    <div className="course-module-list">
      <WebComponent data={course.modules} loading={false}>
        {(rawModules): JSX.Element => (
          <DragAndDropList droppableType="MODULES" items={rawModules} itemKey="id" handleDrop={handleDrop}>
            {modules => (
              <div className="module-list">
                <ItemArray data={modules}>
                  {(module, index) => (
                    <DragAndDropListItem draggableId={module.id} index={index}>
                      <ModuleView index={index} module={module} updateModule={updateModule} />
                    </DragAndDropListItem>
                  )}
                </ItemArray>
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
}

export interface ModuleItemViewProps {
  module: Module;
  moduleItem: ModuleItem;
  index: number;
}

export default CourseModuleList;
