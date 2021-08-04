import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import React from 'react';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import ROUTES from '@doorward/common/frontend/routes/main';

const CreateTeacherGroup: React.FunctionComponent<CreateTeacherGroupProps> = (props): JSX.Element => {
  const [fetchTeachers, teacherList] = useApiAction(DoorwardApi, (api) => api.teachers.getAllTeachers);
  return (
    <CreateGroup
      emptyMessage={translate('noTeachersHaveBeenCreatedYet')}
      title={translate('teachers')}
      type={Groups.TEACHER}
      state={teacherList}
      getUsers={(data) => data?.teachers}
      redirectOnSuccess={ROUTES.groups.teachers.list}
      actionCreator={fetchTeachers}
      {...props}
    />
  );
};

export interface CreateTeacherGroupProps extends PageComponent {}

export default CreateTeacherGroup;
