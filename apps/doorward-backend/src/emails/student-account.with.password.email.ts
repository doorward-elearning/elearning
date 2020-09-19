import EmailModel from '@doorward/backend/modules/emails/email.model';

export default class StudentAccountWithPasswordEmail extends EmailModel<{
  password: string;
  link: string;
}> {
  getTemplate(): string {
    return 'student_new_account_with_password.pug';
  }
}
