import OrganizationEntity from '@doorward/common/entities/organization.entity';

const organizationModelsTranslate = (str: string, organization?: OrganizationEntity) => {
  const regex = /{{(\w+)}}/g;
  let result;
  while ((result = regex.exec(str))) {
    const token = result[0];
    const value = result[1];
    if (organization) {
      str = organization.models[value] ? str.replace(token, organization.models[value]) : str;
    }
  }
  return str;
};

export default organizationModelsTranslate;
