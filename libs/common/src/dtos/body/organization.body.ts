import DApiBody from '@doorward/common/dtos/body/base.body';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import { CustomerTypes } from '@doorward/common/types/customerTypes';

export class CreateOrganizationBody extends DApiBody {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  icon: string;

  @ApiProperty()
  @Expose()
  link: string;

  @ApiProperty()
  @Expose()
  darkThemeIcon: string;

  @ApiProperty()
  @Expose()
  descriptiveLogo: boolean;

  @ApiProperty()
  @Expose()
  meetingPlatform: MeetingPlatform;

  @ApiProperty()
  @Expose()
  customerType: CustomerTypes;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      name: Yup.string().required('The {{organization}} name is required').nullable(),
      description: Yup.string().nullable().notRequired(),
      icon: Yup.string()
        .required('The {{organization}} logo is required.')
        .nullable()
        .url('Please enter a valid image URL'),
      link: Yup.string()
        .required('The {{organization}} website URL is required')
        .nullable()
        .url('Please enter a valid link.'),
      darkThemeLogo: Yup.string().nullable().url('Please enter a valid image URL').notRequired(),
      descriptiveLogo: Yup.bool().notRequired(),
      meetingPlatform: Yup.string()
        .nullable()
        .notRequired()
        .oneOf(Object.values(MeetingPlatform), 'Choose a valid meetings platform.'),
      customerType: Yup.string()
        .required('The customer type is required')
        .oneOf(Object.values(CustomerTypes), 'Please choose a correct customer type value.')
        .nullable(),
    });
  }
}

export class UpdateOrganizationBody extends CreateOrganizationBody {}
