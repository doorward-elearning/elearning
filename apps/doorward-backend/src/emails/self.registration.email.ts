import EmailModel from '@doorward/backend/modules/emails/email.model';

export default class SelfRegistrationEmail extends EmailModel<{
  link: string;
}> {
  getTemplate(): string {
    return 'new_account.pug';
  }
}
