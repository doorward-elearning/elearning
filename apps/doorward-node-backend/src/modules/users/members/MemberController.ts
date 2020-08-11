import * as roles from '../../../utils/roles';
import UserController from '../UserController';
import models from '../../../database/models';
import Emails from '../../../utils/Emails';
import bcrypt from 'bcrypt';
import { User } from '../../../../../../libs/common/src/models/User';
import { searchQuery } from '../../../utils/query';

class MemberController {
  static async createMember(req) {
    const { user: member, resetToken, originalPassword } = await UserController.createUser(req, roles.MEMBER);

    // send mail to member
    if (originalPassword) {
      Emails.memberCreatedWithPassword(member, resetToken, req.headers.origin, originalPassword);
    } else {
      Emails.memberCreated(member, resetToken, req.headers.origin);
    }

    return [200, { member }, `${member.username} has been added successfully`];
  }

  static async updateMemberPassword(req) {
    const {
      body: { password },
      params: { memberId },
    } = req;

    const member = await models.User.findByPk(memberId);

    await member.update({
      password: bcrypt.hashSync(password, +process.env.BCRYPT_PASSWORD_SALT),
    });

    Emails.memberPasswordChanged(member, password);

    return [200, undefined, 'Password changed successfully'];
  }

  static async updateMember(req) {
    const {
      body,
      params: { memberId },
    } = req;
    const member = await models.User.findByPk(memberId);

    const data = { ...body };

    delete data.password;

    member.update({ ...data });

    return [200, { member }, `${member.username} has been updated successfully`];
  }

  static async getAllMembers(req) {
    const result = await UserController.paginate<User>(req, roles.MEMBER, {
      where: searchQuery(req, ['username', 'firstName', 'lastName', 'email']),
    });

    return [200, { members: result.model }, undefined, { pagination: result.pagination }];
  }

  static async getMember(req) {
    const {
      params: { memberId },
    } = req;
    const member = await UserController.findOneByRole(roles.MEMBER, {
      where: {
        id: memberId,
      },
      include: [
        {
          model: models.Course,
          as: 'courses',
          required: false,
        },
      ],
    });

    return [200, { member }];
  }
}

export default MemberController;
