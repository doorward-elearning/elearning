import EmailModel from '@doorward/backend/modules/emails/email.model';

export default class NewAccountEmail extends EmailModel<{
  resetToken;
}> {
  getTemplate(): string {
    return 'student_new_account.pug';
  }
}
