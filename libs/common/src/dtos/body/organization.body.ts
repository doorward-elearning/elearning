import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { Expose } from 'class-transformer';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import translate from '@doorward/common/lang/translate';

export class CreateOrganizationBody extends DApiBody {
  @Expose()
  name: string;

  @Expose()
  displayName: string;

  @Expose()
  description: string;

  @Expose()
  logo: string;

  @Expose()
  hosts: string;

  @Expose()
  darkThemeIcon: string;

  @Expose()
  descriptiveLogo: boolean;

  @Expose()
  meetingPlatform: MeetingPlatform;

  @Expose()
  customerType: CustomerTypes;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      name: Yup.string()
        .matches(/^[a-z](?!.*?[^a-z_]).*?[a-z]$/, translate('orgNameValidationMessage'))
        .required(translate('nameRequired'))
        .nullable(),
      displayName: Yup.string().required(translate('orgDisplayNameIsRequired')).nullable(),
      description: Yup.string().nullable().notRequired(),
      logo: Yup.string().required(translate('logoRequired')).nullable().url(translate('urlInvalid')),
      hosts: Yup.string().required(translate('urlRequired')).nullable(),
      darkThemeLogo: Yup.string().nullable().url(translate('urlInvalid')).notRequired(),
      descriptiveLogo: Yup.bool().notRequired(),
      meetingPlatform: Yup.string()
        .nullable()
        .notRequired()
        .oneOf(Object.values(MeetingPlatform), translate('invalidMeetingPlatform')),
      customerType: Yup.string()
        .required(translate('typeIsRequired'))
        .oneOf(Object.values(CustomerTypes), translate('invalidType'))
        .nullable(),
    });
  }

  inputGuide(): Record<string, string[]> {
    return {
      name: [
        translate('orgNameValidationGuide'),
        translate('orgNameValidationGuide2'),
        translate('orgNameValidationGuide3'),
      ],
    };
  }
}

export class UpdateOrganizationBody extends CreateOrganizationBody {}
