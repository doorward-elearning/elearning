import EmailSender from '../../emails';
import models from '../database/models';
import Tools from './Tools';

class Emails {
  static async studentCreated(student, resetToken, origin) {
    const organization = await models.Organization.findByPk(student.organizationId);

    return EmailSender.sendMail('student_new_account.pug', student.email, `${organization.name} new student account`, {
      username: student.username,
      organization: organization.name,
      link: `${origin}/password/create/${encodeURIComponent(resetToken)}/${encodeURIComponent(
        Tools.encrypt(student.email)
      )}`,
    });
  }

  static async studentCreatedWithPassword(student, resetToken, origin, originalPassword) {
    const organization = await models.Organization.findByPk(student.organizationId);

    return EmailSender.sendMail(
      'student_new_account_with_password.pug',
      student.email,
      `${organization.name} new student account`,
      {
        username: student.username,
        organization: organization.name,
        password: originalPassword,
        link: `${origin}/login/`,
      }
    );
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
      username: teacher.fullName,
      organization: organization.name,
      link: `${origin}/password/create/${encodeURIComponent(resetToken)}/${encodeURIComponent(
        Tools.encrypt(teacher.email)
      )}`,
    });
  }

  static schoolCreated(school) {
    return EmailSender.sendMail('new_school.pug', process.env.EDUDOOR_ADMIN_EMAIL, `New school created`, {
      name: school.name,
      email: school.email,
      phoneNumber: school.phoneNumber,
    });
  }
}

export default Emails;
