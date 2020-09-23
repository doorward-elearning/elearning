import EmailModel from '@doorward/backend/modules/emails/email.model';

export default class TeacherNewAccountEmail extends EmailModel<{ link: string }> {
  getTemplate(): string {
    return 'teacher_new_account.pug';
  }
}
