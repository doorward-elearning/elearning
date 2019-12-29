import EmailSender from '../../emails';
import models from '../database/models';
import Tools from './Tools';

class Emails {
  static async studentCreated(student, resetToken, origin) {
    const organization = await models.Organization.findByPk(student.organizationId);

    return EmailSender.sendMail('student_new_account.pug', student.email, `${organization.name} new student account`, {
      username: `${student.firstName} ${student.lastName}`,
      organization: organization.name,
      link: `${origin}/password/create/${encodeURIComponent(resetToken)}/${encodeURIComponent(
        Tools.encrypt(student.email)
      )}`,
    });
  }

  static async resetPassword(user, resetToken, origin) {
    return EmailSender.sendMail('password_reset.pug', user.email, 'Password reset', {
      username: user.fullName,
      link: `${origin}/password/reset/${encodeURIComponent(resetToken)}/${encodeURIComponent(
        Tools.encrypt(user.email)
      )}`,
    });
  }

  static async selfRegistration(user) {
    return EmailSender.sendMail('new_account.pug', user.email, 'Confirm Registration', {
      username: user.fullName,
      link: 'https://edudoor.org',
    });
  }

  static async teacherCreated(teacher, resetToken, origin) {
    const organization = await models.Organization.findByPk(teacher.organizationId);

    return EmailSender.sendMail('teacher_new_account.pug', teacher.email, `${organization.name} new teacher account`, {
      username: `${teacher.firstName} ${teacher.lastName}`,
      organization: organization.name,
      link: `${origin}/password/create/${encodeURIComponent(resetToken)}/${encodeURIComponent(
        Tools.encrypt(teacher.email)
      )}`,
    });
  }
}

export default Emails;
