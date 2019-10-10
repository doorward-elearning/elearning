const Schema = [
  {
    title: 'Dashboard',
    link: '/',
    icon: 'dashboard',
  },
  {
    title: 'Event Management',
    link: '/event-management',
    icon: 'event',
  },
];

export interface SubMenuItem {
  title: string;
  link: string;
}

export interface MenuItem {
  title: string;
  icon: string;
  link?: string;
  subMenu?: Array<SubMenuItem>;
}

export default Schema;
