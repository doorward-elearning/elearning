import UserController from '../UserController';
import * as roles from '../../../utils/roles';
import Emails from '../../../utils/Emails';
import OrganizationUtils from '../../../utils/OrganizationUtils';

class ModeratorController {
  static async createModerator(req) {
    const { user: moderator, resetToken, originalPassword } = await UserController.createUser(req, roles.MODERATOR);

    // send mail to moderator
    if (originalPassword) {
      Emails.moderatorCreatedWithPassword(moderator, req.query.redirect_origin || req.headers.origin, originalPassword);
    } else {
      Emails.moderatorCreated(moderator, resetToken, req.query.redirect_origin || req.headers.origin);
    }

    return [200, { moderator }, `${moderator.username} has been added successfully`];
  }

  static async getAllModerators() {
    const moderators = await UserController.findByRole(roles.MODERATOR, {
      where: {
        organizationId: OrganizationUtils.getId(),
      },
    });

    return [200, { moderators }];
  }
}

export default ModeratorController;
