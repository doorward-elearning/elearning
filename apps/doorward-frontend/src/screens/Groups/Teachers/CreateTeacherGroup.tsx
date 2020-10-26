import CreateGroup from '../CreateGroup';
import Groups from '@doorward/common/utils/GroupTypes';
import React from 'react';
import { PageComponent } from '@doorward/ui/types';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';

const CreateTeacherGroup: React.FunctionComponent<CreateTeacherGroupProps> = (props): JSX.Element => {
  const teacherList = useDoorwardApi((state) => state.teachers.getAllTeachers);
  return (
    <CreateGroup
      emptyMessage={translate.noTeachersHaveBeenCreatedYet()}
      title={translate.teachers()}
      type={Groups.TEACHER}
      state={teacherList}
      getUsers={(data) => data.teachers}
      redirectOnSuccess={'teacherGroups'}
      actionCreator={DoorwardApi.teachers.getAllTeachers}
      {...props}
    />
  );
};

export interface CreateTeacherGroupProps extends PageComponent {}

export default CreateTeacherGroup;
