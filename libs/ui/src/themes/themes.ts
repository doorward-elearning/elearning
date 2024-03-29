const base = {
  '--bg-primary': '#FFFFFF',
  '--bg-primary-dark': 'rgba(221,221,221,0.61)',
  '--bg-secondary': 'rgba(249,249,249)',
  '--primary': '#3F51B5',
  '--primary-dark': '#354497',
  '--text-alternate': '#f4f4f4',
  '--container-width': '1200px',
  '--text-primary': '#333333',
  '--text-secondary': '#565656',
  '--font-family': '"Graphik", sans-serif',
  '--line-color': 'rgba(0, 0, 0, .1)',
  '--shadow-color': 'rgba(50, 50, 50, .08)',
  '--shadow-color--darker': 'rgba(0, 0, 0, .15)',
  '--border-radius': '0em',
  '--padding-sm': '4px',
  '--text-icons': '#eee',
  '--padding': '8px',
  '--padding-lg': '16px',
  '--padding-xlg': '24px',
  '--text-error': 'rgb(185,0,0)',
  '--text-warning': 'rgb(205,135,52)',
  '--text-success': '#118f0e',
  '--accent': '#FF4081',
  '--box-shadow': '0 2px 15px 6px var(--shadow-color)',
  '--box-shadow--hover': '2px 6px 12px 2px var(--shadow-color--darker)',
  '--sidebar-size': '280px',
  '--navBar-size': '70px',
  '--collapsed-sidebar-size': '74px',
  '--menu-item-height': '40px',
  '--search-bar-background': 'rgba(74,74,74,0.07)',
  '--page-font-size': '14px',
  '--list-item-height': '40px',
  '--list-item-width': '200px',
  '--modal-background': 'rgba(0, 0, 0, .5)',
  '--modal-header-height': '70px',
  '--modal-footer-height': '70px',
  '--button-default': '#ccc',
  '--button-default-color': '#151515',
  '--button-success': '#1e8a1f',
  '--button-success-color': '#ffffff',
  '--button-info': '#4d63df',
  '--scrollbar-color': '#ccc',
  '--scrollbar-color__hover': '#aaa',
  '--button-info-color': '#ccc',
  '--button-danger': '#850e09',
  '--button-danger-color': '#f1f1f1',
  '--button-warning': '#ff4a52',
  '--button-warning-color': '#000000',
  '--submitting-spinner-background': 'rgba(255, 255, 255, .4)',
  '--tabLayout--header-height': '40px',
  '--refreshing-bg': 'rgba(255, 255, 255, .2)',
  logo: '',
};

const dark: Theme = {
  ...base,
  '--bg-primary': '#2b2b2b',
  '--bg-primary-dark': '#252525',
  '--bg-secondary': '#343434',
  '--search-bar-background': 'rgba(135,135,135,0.07)',
  '--text-alternate': '#000000',
  '--text-primary': '#ffffff',
  '--primary': '#746dff',
  '--primary-dark': '#3e50b3',
  '--text-secondary': '#b3b3b3',
  '--text-icons': '#ccc',
  '--line-color': 'rgb(89,89,89)',
  '--shadow-color': '#282828',
  '--shadow-color--darker': '#1d1d1d',
  '--text-error': 'rgb(255,74,82)',
  '--modal-background': 'rgba(0, 0, 0, .5)',
  '--submitting-spinner-background': 'rgba(0, 0, 0, .4)',
  '--accent': '#c76a00',
  '--refreshing-bg': 'rgba(0, 0, 0, .1)',
  '--scrollbar-color': '#666',
  '--scrollbar-color__hover': '#777',
  logo: '',
};

const themes = {
  base,
  dark,
};

export type Theme = {
  [key in keyof typeof base]: string;
};

export type ThemePack = {
  [key in keyof typeof themes]: Theme;
};

export default themes;
