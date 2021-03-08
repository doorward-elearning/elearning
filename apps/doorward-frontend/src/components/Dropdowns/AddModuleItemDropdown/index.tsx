import React from 'react';
import Dropdown from '@doorward/ui/components/Dropdown';
import { Icons } from '@doorward/ui/types/icons';
import Icon from '@doorward/ui/components/Icon';
import Row from '@doorward/ui/components/Row';
import ModuleEntity from '@doorward/common/entities/module.entity';
import translate from '@doorward/common/lang/translate';
import Tools from '@doorward/common/utils/Tools';
import ROUTES from '@doorward/common/frontend/routes/main';

export const ModuleItemIcons: { [name: string]: Icons } = {
  Page: 'format_align_justify',
  Assignment: 'format_list_numbered',
  Quiz: 'view_list',
  'Discussion Forum': 'more',
  File: 'file_copy',
  Assessment: 'assessment',
  Video: 'ondemand_video',
};

const AddModuleItemDropdown: React.FunctionComponent<AddModuleItemDropdownProps> = (props) => {
  const { module } = props;
  return (
    <Dropdown positionX="right">
      <Row>
        <Icon clickable icon="add" />
      </Row>
      <Dropdown.Menu>
        <Dropdown.Item
          icon={ModuleItemIcons.Page}
          link={Tools.createRoute(ROUTES.courses.modules.pages.create, { moduleId: module.id })}
        >
          {translate('page')}
        </Dropdown.Item>
        <Dropdown.Item
          icon={ModuleItemIcons.Assignment}
          link={Tools.createRoute(ROUTES.courses.modules.assignments.create, { moduleId: module.id })}
        >
          {translate('assignment')}
        </Dropdown.Item>
        <Dropdown.Item
          icon={ModuleItemIcons.Quiz}
          link={Tools.createRoute(ROUTES.courses.modules.quizzes.create, { moduleId: module.id })}
        >
          {translate('quiz')}
        </Dropdown.Item>
        <Dropdown.Item
          icon={ModuleItemIcons.Assessment}
          link={Tools.createRoute(ROUTES.courses.modules.exams.create, { moduleId: module.id })}
        >
          {translate('exam')}
        </Dropdown.Item>
        <Dropdown.Item
          icon={ModuleItemIcons.Video}
          link={Tools.createRoute(ROUTES.courses.modules.videos.create, { moduleId: module.id })}
        >
          {translate('video')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export interface AddModuleItemDropdownProps {
  module: ModuleEntity;
  courseId: string;
}

export default AddModuleItemDropdown;
