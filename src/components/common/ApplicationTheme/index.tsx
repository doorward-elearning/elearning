import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import themes, { Theme } from '../../../assets/themes';
import useKeyPress from '../../../hooks/useKeyPress';

const ApplicationTheme: FunctionComponent<ApplicationThemeProps> = ({ theme = 'base', children }): JSX.Element => {
  const previousTheme = localStorage.getItem('theme');
  const [currentTheme, setTheme] = useState(previousTheme || theme);

  const onKeyPress = useCallback(() => {
    const storedTheme = localStorage.getItem('theme') || currentTheme;
    setTheme(storedTheme === 'base' ? 'dark' : 'base');
  }, [setTheme]);

  useKeyPress(186, onKeyPress, true);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    if (currentTheme) {
      const html: HTMLElement = document.getElementsByTagName('html')[0];
      const themeProperties: any = themes[currentTheme || 'base'];
      Object.keys(themeProperties).forEach(key => {
        html.style.setProperty(key, themeProperties[key]);
      });
    }
  }, [currentTheme]);

  return <div className="ed-app">{children}</div>;
};

export interface ApplicationThemeProps {
  theme: string;
}

export default ApplicationTheme;
