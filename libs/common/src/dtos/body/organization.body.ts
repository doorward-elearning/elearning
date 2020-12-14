import DApiBody from '@doorward/common/dtos/body/base.body';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import translate from '@doorward/common/lang/translate';

export class CreateOrganizationBody extends DApiBody {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  icon: string;

  @Expose()
  link: string;

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
      name: Yup.string().required(translate('nameRequired')).nullable(),
      description: Yup.string().nullable().notRequired(),
      icon: Yup.string().required(translate('logoRequired')).nullable().url(translate('urlInvalid')),
      link: Yup.string().required(translate('urlRequired')).nullable().url(translate('urlInvalid')),
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
}

export class UpdateOrganizationBody extends CreateOrganizationBody {
}
