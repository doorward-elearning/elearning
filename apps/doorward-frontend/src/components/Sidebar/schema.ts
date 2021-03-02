import { MenuItem } from '@doorward/ui/hooks/useSidebarSchema';
import useAuth from '../../hooks/useAuth';
import translate from '@doorward/common/lang/translate';

export default (): Array<MenuItem> => {
  const { logout } = useAuth();
  return [
    {
      name: translate('dashboard'),
      icon: 'dashboard',
      link: '/dashboard',
    },
    {
      name: translate('courses'),
      icon: 'school',
      link: '/courses',
      subMenu: [{ name: translate('courseList'), link: '/courses' }],
    },
    {
      name: translate('students'),
      link: '/students',
      icon: 'account_circle',
      privileges: ['students.*'],
      subMenu: [
        { name: translate('studentList'), link: '/students' },
        { name: translate('addStudent'), link: '/students/create' },
      ],
    },
    {
      name: translate('teachers'),
      link: '/teachers',
      icon: 'work',
      privileges: ['teachers.*'],
      subMenu: [
        { name: translate('teacherList'), link: '/teachers' },
        { name: translate('addTeacher'), link: '/teachers/create' },
      ],
    },
    {
      name: translate('groups'),
      link: '/groups',
      icon: 'people',
      privileges: ['groups.*'],
      subMenu: [
        { name: translate('studentGroups'), link: '/groups/students', privileges: ['groups.students.*'] },
        { name: translate('teacherGroups'), link: '/groups/teachers', privileges: ['groups.teachers.*'] },
      ],
    },
    {
      name: translate('reports'),
      link: '/reports',
      icon: 'trending_up',
      hidden: true,
      privileges: ['reports.*'],
      subMenu: [
        { name: translate('studentReports'), link: '/reports/students', privileges: ['reports.students'] },
        { name: translate('teacherListReports'), link: '/reports/teachers', privileges: ['reports.teachers'] },
      ],
    },
    {
      name: translate('organizations'),
      link: '/organizations',
      icon: 'meeting_room',
      privileges: ['organizations.*'],
    },
    {
      name: translate('logout'),
      onClick: (): void => {
        logout();
        window.location.href = '/login';
      },
      icon: 'exit_to_app',
      link: '',
    },
  ];
};
