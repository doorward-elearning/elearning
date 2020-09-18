import EmailModel from '@doorward/backend/modules/emails/email.model';

export default class AccountWithPasswordEmail extends EmailModel<{
  password: string;
  link: string;
}> {
  getTemplate(): string {
    return 'student_new_account_with_password.pug';
  }
}
