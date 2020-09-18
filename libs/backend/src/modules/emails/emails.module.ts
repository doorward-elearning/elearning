import { DynamicModule, Global, Module } from '@nestjs/common';
import EmailsService from '@doorward/backend/modules/emails/emails.service';

export interface EmailsModuleOptions {
  sendGrid: {
    apiKey: string;
  };
  templatesDir: string;
  sender: () => string;
  senderEmail: () => string;
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
