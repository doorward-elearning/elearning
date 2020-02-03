import React from 'react';
import Groups from '@edudoor/common/utils/GroupTypes';
import { fetchStudentListAction } from '../../../reducers/students/actions';
import CreateGroup from '../CreateGroup';
import { Student } from '@edudoor/common/models/Student';

export default CreateGroup<{ students: Array<Student> }>({
  emptyMessage: 'No students have been created yet',
  type: Groups.STUDENT,
  title: 'Students',
  actionCreator: fetchStudentListAction,
  getState: state => state.students.studentList,
  getUsers: data => data.students,
  redirectOnSuccess: 'studentGroups',
});
