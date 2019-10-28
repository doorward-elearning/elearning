import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import themes, { Theme, ThemePack } from '../../../assets/themes';
import useKeyPress from '../../../hooks/useKeyPress';

export const ThemeContext = React.createContext<Theme>(themes.base);

const ApplicationTheme: FunctionComponent<ApplicationThemeProps> = ({ theme = 'base', children }): JSX.Element => {
  const previousTheme = localStorage.getItem('theme');
  const [currentTheme, setTheme] = useState((previousTheme as keyof ThemePack) || theme);

  const onKeyPress = useCallback(() => {
    const storedTheme = localStorage.getItem('theme') || currentTheme;
    setTheme(storedTheme === 'base' ? 'dark' : 'base');
  }, [setTheme]);

  useKeyPress(186, onKeyPress, true);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    if (currentTheme) {
      const html: HTMLElement = document.getElementsByTagName('html')[0];
      const themeProperties = themes[currentTheme || 'base'];
      (Object.keys(themeProperties) as Array<keyof Theme>).forEach(key => {
        html.style.setProperty(key, themeProperties[key]);
      });
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={themes[currentTheme]}>
      {<div className="ed-app">{children}</div>}
    </ThemeContext.Provider>
  );
};

export interface ApplicationThemeProps {
  theme: keyof ThemePack;
}

export default ApplicationTheme;
