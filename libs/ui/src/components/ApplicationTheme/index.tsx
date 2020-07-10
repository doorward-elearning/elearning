import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import themes, { Theme, ThemePack } from '../../themes/themes';

export interface ThemeContextProps {
  theme: Theme;
  changeTheme: () => void;
}
export const ThemeContext: React.Context<ThemeContextProps> = React.createContext<ThemeContextProps>({
  theme: themes.base,
  changeTheme: () => {},
});

const ApplicationTheme: FunctionComponent<ApplicationThemeProps> = ({ theme = 'base', children }): JSX.Element => {
  const previousTheme = localStorage.getItem('theme');
  const [currentTheme, setTheme] = useState((previousTheme as keyof ThemePack) || theme);

  const switchTheme = () => {
    const storedTheme = localStorage.getItem('theme') || currentTheme;
    setTheme(storedTheme === 'base' ? 'dark' : 'base');
  };
  const onKeyPress = useCallback(() => {
    switchTheme();
  }, [setTheme]);

  useKeyPress(186, onKeyPress, true);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    const style: HTMLStyleElement = document.createElement('style');
    if (currentTheme) {
      let styleContent = '';

      const themeProperties = themes[currentTheme || 'base'];
      (Object.keys(themeProperties) as Array<keyof Theme>).forEach(key => {
        if (key.startsWith('--')) {
          styleContent += `${key}: ${themeProperties[key]};`;
        }
      });

      style.innerHTML = `:root {
        ${styleContent}
      }`;

      head.appendChild(style);
    }
    return () => {
      head.removeChild(style);
    };
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[currentTheme],
        changeTheme: switchTheme,
      }}
    >
      {<div className="ed-app">{children}</div>}
    </ThemeContext.Provider>
  );
};

export interface ApplicationThemeProps {
  theme: keyof ThemePack;
}

export default ApplicationTheme;
