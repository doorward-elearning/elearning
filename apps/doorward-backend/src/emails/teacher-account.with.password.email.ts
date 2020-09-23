import EmailModel from '@doorward/backend/modules/emails/email.model';

export default class TeacherAccountWithPasswordEmail extends EmailModel<{ password: string; link: string }> {
  getTemplate(): string {
    return 'teacher_new_account_with_password.pug';
  }
}
