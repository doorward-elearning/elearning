import { MenuItem } from '@doorward/ui/hooks/useSidebarSchema';
import useAuth from '../../hooks/useAuth';
import translate from '@doorward/common/lang/translate';
import ROUTES from '@doorward/common/frontend/routes/main';

export default (): Array<MenuItem> => {
  const { logout } = useAuth();
  return [
    {
      name: translate('dashboard'),
      icon: 'dashboard',
      link: ROUTES.dashboard,
    },
    {
      name: translate('courses'),
      icon: 'school',
      link: ROUTES.courses.list,
      subMenu: [{ name: translate('courseList'), link: ROUTES.courses.list }],
    },
    {
      name: translate('students'),
      link: ROUTES.students.list,
      icon: 'account_circle',
      privileges: ['students.*'],
      subMenu: [
        { name: translate('studentList'), link: ROUTES.students.list },
        { name: translate('addStudent'), link: ROUTES.students.create },
      ],
    },
    {
      name: translate('teachers'),
      link: ROUTES.teachers.list,
      icon: 'work',
      privileges: ['teachers.*'],
      subMenu: [
        { name: translate('teacherList'), link: ROUTES.teachers.list },
        { name: translate('addTeacher'), link: ROUTES.teachers.create },
      ],
    },
    {
      name: translate('groups'),
      link: '',
      icon: 'people',
      privileges: ['groups.*'],
      subMenu: [
        { name: translate('studentGroups'), link: ROUTES.groups.students.list, privileges: ['student.groups.*'] },
        { name: translate('teacherGroups'), link: ROUTES.groups.teachers.list, privileges: ['teacher.groups.*'] },
      ],
    },
    {
      name: translate('reports'),
      link: '/reports',
      icon: 'trending_up',
      hidden: true,
      privileges: ['reports.*'],
      subMenu: [
        { name: translate('studentReports'), link: ROUTES.reports.students.list, privileges: ['reports.students'] },
        { name: translate('teacherListReports'), link: ROUTES.reports.teachers.list, privileges: ['reports.teachers'] },
      ],
    },
    {
      name: translate('organizations'),
      link: ROUTES.organizations.list,
      icon: 'meeting_room',
      privileges: ['organizations.*'],
    },
    {
      name: translate('logout'),
      onClick: (): void => {
        logout();
        window.location.href = ROUTES.auth.login;
      },
      icon: 'exit_to_app',
      link: '',
    },
  ];
};
