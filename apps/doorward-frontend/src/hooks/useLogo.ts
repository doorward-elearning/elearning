import useTheme from './useTheme';
import { useEffect, useState } from 'react';
import useOrganization from './useOrganization';
import themes from '@doorward/ui/themes/themes';

const useLogo = (): string => {
  const theme = useTheme();
  const organization = useOrganization();

  const [icon, setIcon] = useState(organization?.logo);
  useEffect(() => {
    setIcon(theme.theme === themes.dark ? organization?.darkThemeLogo || organization?.logo : organization?.logo);
  }, [theme]);

  return icon;
};

export default useLogo;
