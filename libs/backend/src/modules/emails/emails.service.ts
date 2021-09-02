import { Inject, Injectable } from '@nestjs/common';
import { EmailsModuleOptions } from '@doorward/backend/modules/emails/emails.module';
import mail from '@sendgrid/mail';
import Email from 'email-templates';
import path from 'path';
import EmailModel, { EmailRecipient } from '@doorward/backend/modules/emails/email.model';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { REQUEST } from '@nestjs/core';
import DoorwardLogger from '@doorward/backend/modules/logging/doorward.logger';

export interface EmailOptions {
  template: string;
  recipient: EmailRecipient;
  organization: OrganizationEntity;
  subject: string;
  data: Record<string, any>;
}

@Injectable()
export default class EmailsService {
  constructor(
    @Inject('EMAIL_CONFIG') private options: EmailsModuleOptions,
    @Inject(REQUEST) private request: any,
    private logger: DoorwardLogger
  ) {
    mail.setApiKey(options.sendGrid.apiKey);
    this.logger.setContext('EmailsService');
  }

  async send<T>(email: EmailModel<T>) {
    const options = email.getConfig();
    const emailConfig = new Email({
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: this.options.templatesDir,
        },
      },
      views: {
        root: './',
      },
    });

    const organization = this.request.organization;

    const result = await emailConfig.render(path.join(this.options.templatesDir, options.template), {
      ...options.data,
      ...this.options.getData(),
      recipient: options.recipient,
      organization,
    });

    const mailData = {
      from: { email: this.options.senderEmail(organization), name: this.options.sender(organization) },
      to: options.recipient.email,
      subject: options.subject,
      html: result,
    };

    this.logger.info(`Sending email to [${options.recipient.email}]`);

    try {
      if (options.recipient.email) {
        return await mail.send(mailData);
      }
    } catch (e) {
      this.logger.error(e);
    }
  }
}
