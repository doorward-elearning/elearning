import useTheme from './useTheme';
import { useEffect, useState } from 'react';
import useOrganization from '@doorward/ui/hooks/useOrganization';
import themes from '@doorward/ui/themes/themes';

const useLogo = (): string => {
  const theme = useTheme();
  const organization = useOrganization();

  const [icon, setIcon] = useState(organization?.icon);
  useEffect(() => {
    setIcon(theme.theme === themes.dark ? organization?.darkThemeIcon || organization?.icon : organization?.icon);
  }, [theme]);

  return icon;
};

export default useLogo;