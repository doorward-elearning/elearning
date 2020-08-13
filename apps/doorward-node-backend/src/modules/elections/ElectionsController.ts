import models from '../../database/models';

export default class ElectionsController {
  static async createElection(req) {
    const {
      body: { title, startDate, endDate },
      user,
    } = req;

    const election = await models.Election.create({
      title,
      startDate,
      endDate,
      createdBy: user.id,
    });

    return [201, { election }, 'Election has been created.'];
  }

  static async getElections() {
    const elections = await models.Election.findAll({
      include: [
        {
          model: models.ElectionNominees,
          as: 'nominees',
          required: false,
          include: [
            {
              model: models.ElectionVote,
              as: 'votes',
              required: false,
            },
          ],
        },
      ],
    });

    return [200, { elections }];
  }

  static async getElection(req) {
    const {
      params: { electionId },
    } = req;

    const election = await models.Election.findByPk(electionId, {
      include: [
        {
          model: models.ElectionNominees,
          as: 'nominees',
          required: false,
          include: [
            {
              model: models.ElectionVote,
              as: 'votes',
              required: false,
            },
          ],
        },
      ],
    });

    return [200, { election }];
  }
}
