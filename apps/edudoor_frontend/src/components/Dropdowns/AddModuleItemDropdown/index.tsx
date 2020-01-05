import React from 'react';
import Dropdown from '@edudoor/ui/components/Dropdown';
import Button from '@edudoor/ui/components/Buttons/Button';
import useRoutes from '../../../hooks/useRoutes';
import { Module } from '../../../services/models';
import { Icons } from '@edudoor/ui/types/icons';

export const ModuleItemIcons: { [name: string]: Icons } = {
  Page: 'format_align_justify',
  Assignment: 'format_list_numbered',
  Quiz: 'view_list',
  'Discussion Forum': 'more',
  File: 'file_copy',
};

const AddModuleItemDropdown: React.FunctionComponent<AddModuleItemDropdownProps> = props => {
  const { routes } = useRoutes();
  const { module } = props;
  const params = { courseId: module.courseId, moduleId: module.id };
  return (
    <Dropdown positionX="right">
      <Button theme="accent" icon="add" mini bordered />
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
        {/*<Dropdown.Item icon={ModuleItemIcons['Discussion Forum']}>Discussion Forum</Dropdown.Item>*/}
        {/*<Dropdown.Item icon={ModuleItemIcons.File}>File</Dropdown.Item>*/}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export interface AddModuleItemDropdownProps {
  module: Module;
}

export default AddModuleItemDropdown;
