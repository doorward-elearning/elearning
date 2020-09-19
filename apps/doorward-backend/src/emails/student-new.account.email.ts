import EmailModel from '@doorward/backend/modules/emails/email.model';

export default class StudentNewAccountEmail extends EmailModel<{
  link: string;
}> {
  getTemplate(): string {
    return 'student_new_account.pug';
  }
}
