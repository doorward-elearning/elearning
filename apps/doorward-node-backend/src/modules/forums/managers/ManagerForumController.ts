import models from '../../../database/models';

export default class ManagerForumController {
  static async getManagers(req) {
    const {
      params: { forumId },
    } = req;

    const managers = await models.User.findAll({
      include: [
        {
          model: models.Forum,
          as: 'managedForums',
          where: {
            id: forumId,
          },
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return [200, { managers }];
  }
  static async enrollForumManager(req) {
    const {
      params: { forumId },
      body: { managerId },
      user,
    } = req;

    const manager = await models.User.findByPk(managerId);
    const forumManager = await models.ForumManager.findOne({
      where: {
        managerId,
        forumId,
      },
    });
    if (!forumManager)
      await models.ForumManager.create({
        managerId,
        forumId,
        enrolledById: user.id,
      });

    return [200, { manager }, `${manager.fullName} has been added as a forum manager.`];
  }
}
