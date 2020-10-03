import translation from '@doorward/common/utils/translation';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

global.t = translation();

export const updateTranslationOrganization = (organization: OrganizationEntity) => {
  global.t = translation(organization.language, organization);
};
