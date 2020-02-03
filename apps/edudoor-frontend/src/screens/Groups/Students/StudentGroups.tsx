import React from 'react';
import Groups from '@edudoor/common/utils/GroupTypes';
import GroupList from '../GroupList';

export default GroupList({
  header: 'Student Groups',
  createRoute: 'addStudentGroup',
  type: Groups.STUDENT,
});
