import { OvSettings } from './ov-settings';

export interface ISessionConfig {
  sessionName: string;
  sessionTitle: string;
  user: string;
  avatar: string;
  tokens: string[];
  ovSettings: OvSettings;
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}
