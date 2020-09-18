import { Inject, Injectable } from '@nestjs/common';
import { EmailsModuleOptions } from '@doorward/backend/modules/emails/emails.module';
import mail from '@sendgrid/mail';
import Email from 'email-templates';
import path from 'path';
import EmailModel from '@doorward/backend/modules/emails/email.model';

export interface EmailOptions {
  template: string;
  recipient: string;
  subject: string;
  data: Record<string, any>;
}

@Injectable()
export default class EmailsService {
  constructor(@Inject('EMAIL_CONFIG') private options: EmailsModuleOptions) {
    mail.setApiKey(options.sendGrid.apiKey);
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
    });

    const mailData = {
      from: { email: this.options.senderEmail(), name: this.options.sender() },
      to: options.recipient,
      subject: options.subject,
      html: result,
    };

    return mail.send(mailData);
  }
}
