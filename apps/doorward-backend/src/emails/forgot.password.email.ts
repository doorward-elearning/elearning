import EmailModel from '@doorward/backend/modules/emails/email.model';

export default class ForgotPasswordEmail extends EmailModel<{
  link: string;
}> {
  getTemplate(): string {
    return 'password_reset.pug';
  }
}
