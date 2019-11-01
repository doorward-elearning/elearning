import React from 'react';
import Dropdown from '../../../ui/Dropdown';
import Button from '../../../ui/Buttons/Button';

const AddModuleItemDropdown: React.FunctionComponent<AddModuleItemDropdownProps> = props => {
  return (
    <Dropdown positionX="right">
      <Button theme="accent" icon="add" mini bordered />
      <Dropdown.Menu>
        <Dropdown.Item icon="format_align_justify">Page</Dropdown.Item>
        <Dropdown.Item icon="format_list_numbered">Assignment</Dropdown.Item>
        <Dropdown.Item icon="more">Discussion Forum</Dropdown.Item>
        <Dropdown.Item icon="file_copy">File</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export interface AddModuleItemDropdownProps {}

export default AddModuleItemDropdown;
