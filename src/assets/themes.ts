const base: Theme = {
  '--bg-primary': '#FFFFFF',
  '--bg-secondary': 'rgba(244,244,244,0.81)',
  '--primary': '#3F51B5',
  '--text-alternate': '#a2a2a2',
  '--text-primary': '#333333',
  '--text-secondary': '#565656',
  '--font-family': 'Source Sans Pro, sans-serif',
  '--line-color': 'rgba(0, 0, 0, .1)',
  '--shadow-color': 'rgba(0, 0, 0, .05)',
  '--shadow-color--darker': 'rgba(0, 0, 0, .2)',
  '--border-radius': '0em',
  '--padding-sm': '4px',
  '--text-icons': '#eee',
  '--padding': '8px',
  '--padding-lg': '16px',
  '--padding-xlg': '24px',
  '--text-error': 'rgba(255,0,0,0.75)',
  '--text-success': 'green',
  '--accent': '#FF4081',
  '--box-shadow': '0 0 8px 8px var(--shadow-color)',
  '--box-shadow--hover': '0 0 6px 4px var(--shadow-color--darker)',
  '--sidebar-size': '300px',
  '--navBar-size': '70px',
  '--collapsed-sidebar-size': '70px'
};

const dark: Theme = {
  ...base,
  '--bg-primary': '#2b2b2b',
  '--bg-secondary': '#343434',
  '--text-alternate': '#666666',
  '--text-primary': '#ffffff',
  '--primary': '#4d63dd',
  '--text-secondary': '#b3b3b3',
  '--text-icons': '#ccc',
  '--line-color': 'rgb(89,89,89)',
  '--shadow-color': '#333333',
  '--shadow-color--darker': '#2a2a2a',
  '--text-error': 'rgb(255,74,82)',
};

const themes: ThemePack = {
  base,
  dark,
};

export type Theme = {
  '--bg-primary': string;
  '--bg-secondary': string;
  '--primary': string;
  '--text-alternate': string;
  '--text-primary': string;
  '--text-secondary': string;
  '--font-family': string;
  '--shadow-color': string;
  '--line-color': string;
  '--border-radius': string;
  '--padding-sm': string;
  '--padding': string;
  '--padding-lg': string;
  '--padding-xlg': string;
  '--text-error': string;
  '--text-success': string;
  '--accent': string;
  '--box-shadow': string;
  '--text-icons': string;
  '--box-shadow--hover': string;
  '--shadow-color--darker': string;
  '--sidebar-size': string;
  '--navBar-size': string;
  '--collapsed-sidebar-size': string;
};

export type ThemePack = {
  [name: string]: Theme;
};

export default themes;
