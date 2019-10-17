const Schema = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    icon: 'dashboard',
  },
  {
    title: 'Event Management',
    link: '/event-management',
    icon: 'event',
    subMenu: [
      {
        title: 'Add professor',
        link: '/event-management/add'
      },
      {
        title: 'All processors',
        link: '/event-management/all'
      },
      {
        title: 'Edit professor',
        link: '/event-management/edit'
      }
    ]
  },
  {
    title: 'Professors',
    link: '/professors',
    icon: 'dashboard',
  },
  {
    title: 'Schools',
    link: '/event-management',
    icon: 'event',
    subMenu: [
      {
        title: 'Add school',
        link: '/schools/add'
      },
      {
        title: 'All schools',
        link: '/schools/all'
      },
      {
        title: 'Edit school',
        link: '/school/edit'
      }
    ]
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
