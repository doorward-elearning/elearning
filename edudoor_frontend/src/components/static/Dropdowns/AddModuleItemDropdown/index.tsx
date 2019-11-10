import React from 'react';
import Dropdown from '../../../ui/Dropdown';
import Button from '../../../ui/Buttons/Button';
import useRoutes from '../../../../hooks/useRoutes';
import { Module } from '../../../../services/models';

const AddModuleItemDropdown: React.FunctionComponent<AddModuleItemDropdownProps> = props => {
  const { routes } = useRoutes();
  const { module } = props;
  return (
    <Dropdown positionX="right">
      <Button theme="accent" icon="add" mini bordered />
      <Dropdown.Menu>
        <Dropdown.Item
          icon="format_align_justify"
          link={routes.addModulePage.withParams({
            courseId: module.courseId,
            moduleId: module.id,
          })}
        >
          Page
        </Dropdown.Item>
        <Dropdown.Item icon="format_list_numbered">Assignment</Dropdown.Item>
        <Dropdown.Item icon="more">Discussion Forum</Dropdown.Item>
        <Dropdown.Item icon="file_copy">File</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export interface AddModuleItemDropdownProps {
  module: Module;
}

export default AddModuleItemDropdown;
