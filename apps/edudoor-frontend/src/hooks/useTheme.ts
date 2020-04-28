import { useContext } from 'react';
import { ThemeContext, ThemeContextProps } from '@edudoor/ui/components/ApplicationTheme';

const useTheme = (): ThemeContextProps => {
  return useContext(ThemeContext);
};

export default useTheme;
