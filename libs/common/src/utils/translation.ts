import OrganizationEntity from '@doorward/common/entities/organization.entity';
import organizationModelsTranslate from '@doorward/common/utils/organizationModelsTranslate';
import en from '@doorward/common/lang/en';

export enum Languages {
  ENGLISH = 'en_US',
}

const translations = {
  [Languages.ENGLISH]: en,
};

const translation = (lang: Languages = Languages.ENGLISH, organization?: OrganizationEntity): typeof en => {
  const language = { ...translations[lang || process.env.LANGUAGE] };

  Object.keys(language).forEach((key) => {
    language[key] = organizationModelsTranslate(language[key], organization);
  });

  return language;
};

export default translation;
