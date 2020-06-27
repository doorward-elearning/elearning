import CreateGroup from '../CreateGroup';
import Groups from '@edudoor/common/utils/GroupTypes';
import { fetchTeacherListAction } from '../../../reducers/teachers/actions';

import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { PageComponent } from '@edudoor/ui/types';

const CreateTeacherGroup: React.FunctionComponent<CreateTeacherGroupProps> = (props): JSX.Element => {
  const teacherList = useSelector((state: State) => state.teachers.teacherList);
  return (
    <CreateGroup
      emptyMessage={'No teachers have been created yet'}
      title="Teachers"
      type={Groups.TEACHER}
      state={teacherList}
      getUsers={data => data.teachers}
      redirectOnSuccess={'teacherGroups'}
      actionCreator={fetchTeacherListAction}
      {...props}
    />
  );
};

export interface CreateTeacherGroupProps extends PageComponent {}

export default CreateTeacherGroup;
