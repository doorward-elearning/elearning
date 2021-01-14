import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import React from 'react';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const CreateTeacherGroup: React.FunctionComponent<CreateTeacherGroupProps> = (props): JSX.Element => {
  const teacherList = useApiAction(DoorwardApi, (api) => api.teachers.getAllTeachers);
  return (
    <CreateGroup
      emptyMessage={translate('noTeachersHaveBeenCreatedYet')}
      title={translate('teachers')}
      type={Groups.TEACHER}
      state={teacherList.state}
      getUsers={(data) => data.teachers}
      redirectOnSuccess={'teacherGroups'}
      actionCreator={teacherList.action}
      {...props}
    />
  );
};

export interface CreateTeacherGroupProps extends PageComponent {}

export default CreateTeacherGroup;
