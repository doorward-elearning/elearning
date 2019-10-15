import React, { FunctionComponent, useEffect, useState } from 'react';
import themes from '../../assets/themes';

const ApplicationTheme: FunctionComponent<ApplicationThemeProps> = ({ theme = 'base', children }): JSX.Element => {
  const [currentTheme, setTheme] = useState<any>(themes[theme]);

  useEffect(() => {
    if (currentTheme) {
      const html: HTMLElement = document.getElementsByTagName('html')[0];
      Object.keys(currentTheme).forEach(key => {
        html.style.setProperty(key, currentTheme[key]);
      });
    }
  });

  return <React.Fragment>{children}</React.Fragment>;
};

export interface ApplicationThemeProps {
  theme: string;
}

export default ApplicationTheme;
