import EmailSender from '../../emails';
import models from '../database/models';
import Tools from './Tools';

class Emails {
  static async memberCreated(member, resetToken, origin) {
    const organization = await models.Organization.findByPk(member.organizationId);

    return EmailSender.sendMail('member_new_account.pug', member.email, `${organization.name} new member account`, {
      username: member.username,
      fullName: member.fullName,
      organization: organization.name,
      link: `${origin}/password/create/${encodeURIComponent(resetToken)}/${encodeURIComponent(
        Tools.encrypt(member.email)
      )}`,
    });
  }

  static async memberPasswordChanged(member, password) {
    return EmailSender.sendMail('password_changed.pug', member.email, `Password changed`, {
      username: member.username,
      fullName: member.fullName,
      password,
    });
  }

  static async memberCreatedWithPassword(member, resetToken, origin, originalPassword) {
    const organization = await models.Organization.findByPk(member.organizationId);

    return EmailSender.sendMail(
      'member_new_account_with_password.pug',
      member.email,
      `${organization.name} new member account`,
      {
        username: member.username,
        fullName: member.fullName,
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
      link: 'https://doorward.tech',
    });
  }

  static async moderatorCreated(moderator, resetToken, origin) {
    const organization = await models.Organization.findByPk(moderator.organizationId);

    return EmailSender.sendMail('moderator_new_account.pug', moderator.email, `${organization.name} new moderator account`, {
      username: moderator.username,
      fullName: moderator.fullName,
      organization: organization.name,
      link: `${origin}/password/create/${encodeURIComponent(resetToken)}/${encodeURIComponent(
        Tools.encrypt(moderator.email)
      )}`,
    });
  }

  static async moderatorCreatedWithPassword(moderator, origin, password) {
    const organization = await models.Organization.findByPk(moderator.organizationId);

    return EmailSender.sendMail(
      'moderator_new_account_with_password.pug',
      moderator.email,
      `${organization.name} new moderator account`,
      {
        username: moderator.username,
        fullName: moderator.fullName,
        organization: organization.name,
        password,
        link: `${origin}/login/`,
      }
    );
  }

  static schoolCreated(school) {
    return EmailSender.sendMail('new_school.pug', process.env.DOORWARD_ADMIN_EMAIL, `New school created`, {
      name: school.name,
      email: school.email,
      phoneNumber: school.phoneNumber,
    });
  }
}

export default Emails;
