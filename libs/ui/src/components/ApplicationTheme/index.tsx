import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import themes, { Theme, ThemePack } from '../../themes/themes';
import updateTheme from '@doorward/ui/themes/updateTheme';
import baseLogo from '../../assets/images/doorward.png';
import darkLogo from '../../assets/images/doorward_white.png';


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
    updateTheme(currentTheme);
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
