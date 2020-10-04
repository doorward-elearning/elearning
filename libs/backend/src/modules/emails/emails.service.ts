import { Inject, Injectable } from '@nestjs/common';
import { EmailsModuleOptions } from '@doorward/backend/modules/emails/emails.module';
import mail from '@sendgrid/mail';
import Email from 'email-templates';
import path from 'path';
import EmailModel, { EmailRecipient } from '@doorward/backend/modules/emails/email.model';
import { PinoLogger } from 'nestjs-pino/dist';

export interface EmailOptions {
  template: string;
  recipient: EmailRecipient;
  subject: string;
  data: Record<string, any>;
}

@Injectable()
export default class EmailsService {
  constructor(@Inject('EMAIL_CONFIG') private options: EmailsModuleOptions, private logger: PinoLogger) {
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

    const result = await emailConfig.render(path.join(this.options.templatesDir, options.template), {
      ...options.data,
      ...this.options.getData(),
      recipient: options.recipient,
    });

    const mailData = {
      from: { email: this.options.senderEmail(), name: this.options.sender() },
      to: options.recipient.email,
      subject: options.subject,
      html: result,
    };

    this.logger.info('Sending email to [%s]', options.recipient.email);

    try {
      return await mail.send(mailData);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
