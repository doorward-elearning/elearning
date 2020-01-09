import mail from '@sendgrid/mail';
import Email from 'email-templates';
import path from 'path';

class EmailSender {
  static async sendMail(template, recipient, subject, data) {
    mail.setApiKey(process.env.SENDGRID_API_KEY);

    const email = new Email({
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, process.env.EMAILS_DIRECTORY),
        },
      },
      views: {
        root: './',
      },
    });

    const result = await email.render(process.env.EMAILS_DIRECTORY + template, data);

    const mailData = {
      from: { email: `${process.env.EMAIL_SENDER}`, name: 'Edudoor' },
      to: recipient,
      subject: `${subject}: Edudoor`,
      html: result,
    };

    return mail.send(mailData);
  }
}

export default EmailSender;
