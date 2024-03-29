import OrganizationEntity from '@doorward/common/entities/organization.entity';

const generateEmailData = (organization: OrganizationEntity) => {
  const organizationName = organization.name;
  const organizationLogo = organization.logo || organization.darkThemeLogo;

  return {
    organizationName: organization.descriptiveLogo ? '' : organizationName,
    organizationLogo,
  };
};

export default generateEmailData;
