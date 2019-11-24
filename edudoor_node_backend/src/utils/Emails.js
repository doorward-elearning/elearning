import EmailSender from '../../emails';
import models from '../database/models';
import Tools from './Tools';

class Emails {
  static async studentCreated(student, resetToken) {
    const organization = await models.Organization.findByPk(student.organizationId);

    return EmailSender.sendMail('student_new_account.pug', student.email, `${organization.name} new student account`, {
      username: `${student.firstName} ${student.lastName}`,
      organization: organization.name,
      link: `${process.env.FRONTEND_URL}/password/create/${encodeURIComponent(resetToken)}/${encodeURIComponent(
        Tools.encrypt(student.email)
      )}`,
    });
  }

  static async resetPassword(user, resetToken) {
    return EmailSender.sendMail('password_reset.pug', user.email, 'Password reset', {
      username: user.fullName,
      link: `${process.env.FRONTEND_URL}/password/create/${encodeURIComponent(resetToken)}/${encodeURIComponent(
        Tools.encrypt(user.email)
      )}`,
    });
  }
}

export default Emails;
