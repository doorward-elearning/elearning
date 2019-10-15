const base: Theme = {
  '--bg-primary': '#FFFFFF',
  '--bg-secondary': '#d6d6d6',
  '--primary': '#3b79cc',
  '--text-alternate': '#a2a2a2',
  '--text-primary': '#333333',
  '--text-secondary': '#565656',
  '--font-family': 'Roboto, sans-serif',
  '--line-color': 'rgba(0, 0, 0, .2)',
  '--shadow-color': 'rgba(0, 0, 0, .1)',
  '--border-radius': '0em',
  '--padding-sm': '4px',
  '--padding': '8px',
  '--padding-lg': '16px',
  '--padding-xlg': '24px',
  '--text-error': 'rgba(255,0,0,0.75)',
  '--text-success': 'green',
};

const dark: Theme = {
  ...base,
  '--bg-primary': '#181818',
  '--bg-secondary': '#282828',
  '--primary': '#1db954',
  '--text-alternate': '#666666',
  '--text-primary': '#ffffff',
  '--text-secondary': '#b3b3b3',
  '--line-color': '#727272',
  '--shadow-color': '#575757',
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
};

export type ThemePack = {
  [name: string]: Theme;
};

export default themes;
