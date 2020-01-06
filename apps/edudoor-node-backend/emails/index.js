import mail from '@sendgrid/mail';
import Email from 'email-templates';
import path from 'path';
import { environment } from '../src/environments/environment';

class EmailSender {
  static async sendMail(template, recipient, subject, data) {
    mail.setApiKey(environment.SENDGRID_API_KEY);

    const email = new Email({
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, './'),
        },
      },
    });

    const result = await email.render(template, data);

    const mailData = {
      from: { email: `${environment.EMAIL_SENDER}`, name: 'Edudoor' },
      to: recipient,
      subject: `${subject}: Edudoor`,
      html: result,
    };

    return mail.send(mailData);
  }
}

export default EmailSender;
