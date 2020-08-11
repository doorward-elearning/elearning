import models from '../../../database/models';

export default class ManagerConferenceController {
  static async getManagers(req) {
    const {
      params: { conferenceId },
    } = req;

    const managers = await models.User.findAll({
      include: [
        {
          model: models.Conference,
          as: 'managedConferences',
          where: {
            id: conferenceId,
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
  static async enrollConferenceManager(req) {
    const {
      params: { conferenceId },
      body: { managerId },
      user,
    } = req;

    const manager = await models.User.findByPk(managerId);
    const conferenceManager = await models.ConferenceManager.findOne({
      where: {
        managerId,
        conferenceId,
      },
    });
    if (!conferenceManager)
      await models.ConferenceManager.create({
        managerId,
        conferenceId,
        enrolledById: user.id,
      });

    return [200, { manager }, `${manager.fullName} has been added as a conference manager.`];
  }
}
