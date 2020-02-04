import React from 'react';
import Groups from '@edudoor/common/utils/GroupTypes';
import GroupList from '../GroupList';

export default GroupList({
  header: 'Teacher Groups',
  createRoute: 'addTeacherGroup',
  type: Groups.TEACHER,
  viewRoute: 'viewTeacherGroup',
});
