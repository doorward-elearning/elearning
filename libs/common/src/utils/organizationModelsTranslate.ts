import OrganizationEntity from '@doorward/common/entities/organization.entity';
import _ from 'lodash';

const organizationModelsTranslate = (str: string, organization?: OrganizationEntity) => {
  const regex = /{{(\w+)}}/g;
  let result;
  while ((result = regex.exec(str))) {
    const token = result[0];
    const value = result[1];
    if (organization) {
      str = str.replace(token, organization.models[value]);
    } else {
      str = str.replace(token, _.capitalize(value));
    }
  }
  return str;
};

export default organizationModelsTranslate;
