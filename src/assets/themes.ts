const themes: ThemePack = {
  base: {
    '--bg-primary': '#FFFFFF',
    '--bg-secondary': '#d6d6d6',
    '--primary': '#3b79cc',
    '--text-alternate': '#a2a2a2',
    '--text-primary': '#333333',
    '--text-secondary': '#565656',
  },
  dark: {
    '--bg-primary': '#181818',
    '--bg-secondary': '#282828',
    '--primary': '#1db954',
    '--text-alternate': '#666666',
    '--text-primary': '#ffffff',
    '--text-secondary': '#b3b3b3',
  },
};

export type Theme = {
  '--bg-primary': string;
  '--bg-secondary': string;
  '--primary': string;
  '--text-alternate': string;
  '--text-primary': string;
  '--text-secondary': string;
};

export type ThemePack = {
  [name: string]: Theme;
};

export default themes;
