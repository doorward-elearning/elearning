import CreateGroup from '../CreateGroup';
import Groups from '@edudoor/common/utils/GroupTypes';
import {fetchTeacherListAction} from '../../../reducers/teachers/actions';
import {Teacher} from '@edudoor/common/models/Teacher';

export default CreateGroup<{ teachers: Array<Teacher> }>({
  emptyMessage: 'No teachers have been created yet',
  type: Groups.TEACHER,
  title: 'Teachers',
  actionCreator: fetchTeacherListAction,
  getState: state => state.teachers.teacherList,
  getUsers: data => data.teachers,
  redirectOnSuccess: 'teacherGroups',
});
