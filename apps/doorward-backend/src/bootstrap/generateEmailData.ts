import { ORGANIZATION } from './organizationSetup';

const generateEmailData = () => {
  const organizationName = ORGANIZATION.name;
  const organizationLogo = ORGANIZATION.icon || ORGANIZATION.darkThemeIcon;

  return {
    organizationName: ORGANIZATION.descriptiveLogo ? '' : organizationName,
    organizationLogo,
    models: ORGANIZATION.models,
  };
};

export default generateEmailData;
