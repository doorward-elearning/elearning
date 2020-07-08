import { useContext } from 'react';
import { ThemeContext, ThemeContextProps } from '@doorward/ui/components/ApplicationTheme';

const useTheme = (): ThemeContextProps => {
  return useContext(ThemeContext);
};

export default useTheme;
