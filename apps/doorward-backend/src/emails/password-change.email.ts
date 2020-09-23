import EmailModel from '@doorward/backend/modules/emails/email.model';
import { ForceChangePasswordBody } from '@doorward/common/dtos/body';

export default class PasswordChangeEmail extends EmailModel<ForceChangePasswordBody> {
  getTemplate(): string {
    return 'password_changed.pug';
  }
}
