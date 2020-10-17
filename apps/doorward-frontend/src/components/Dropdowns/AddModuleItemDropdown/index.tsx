import React from 'react';
import useRoutes from '../../../hooks/useRoutes';
import Dropdown from '@doorward/ui/components/Dropdown';
import { Icons } from '@doorward/ui/types/icons';
import Icon from '@doorward/ui/components/Icon';
import Row from '@doorward/ui/components/Row';
import ModuleEntity from '@doorward/common/entities/module.entity';

export const ModuleItemIcons: { [name: string]: Icons } = {
  Page: 'format_align_justify',
  Assignment: 'format_list_numbered',
  Quiz: 'view_list',
  'Discussion Forum': 'more',
  File: 'file_copy',
  Exam: 'assessment',
};

const AddModuleItemDropdown: React.FunctionComponent<AddModuleItemDropdownProps> = (props) => {
  const { routes } = useRoutes();
  const { module } = props;
  const params = { courseId: props.courseId, moduleId: module.id };
  return (
    <Dropdown positionX="right">
      <Row>
        <Icon clickable icon="add" />
      </Row>
      <Dropdown.Menu>
        <Dropdown.Item icon={ModuleItemIcons.Page} link={routes.addModulePage.withParams(params)}>
          Page
        </Dropdown.Item>
        <Dropdown.Item icon={ModuleItemIcons.Assignment} link={routes.addAssignment.withParams(params)}>
          Assignment
        </Dropdown.Item>
        <Dropdown.Item icon={ModuleItemIcons.Quiz} link={routes.addQuiz.withParams(params)}>
          Quiz
        </Dropdown.Item>
        <Dropdown.Item icon={ModuleItemIcons.Exam} link={routes.addExam.withParams(params)}>
          Exam
        </Dropdown.Item>
        {/*<Dropdown.Item icon={ModuleItemIcons.File}>File</Dropdown.Item>*/}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export interface AddModuleItemDropdownProps {
  module: ModuleEntity;
  courseId: string;
}

export default AddModuleItemDropdown;
