import { DynamicModule, Global, Module } from '@nestjs/common';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

export interface EmailsModuleOptions {
  sendGrid: {
    apiKey: string;
  };
  templatesDir: string;
  sender: (organization: OrganizationEntity) => string;
  senderEmail: (organization: OrganizationEntity) => string;
  getData: () => Record<string, any>;
}

@Global()
@Module({})
export default class EmailsModule {
  static register(options: EmailsModuleOptions): DynamicModule {
    return {
      module: EmailsModule,
      providers: [
        {
          provide: 'EMAIL_CONFIG',
          useValue: options,
        },
        EmailsService,
      ],
      exports: [EmailsService],
    };
  }
}
