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
        {
          model: models.User,
          as: 'author',
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

  static async addNominee(req) {
    const {
      params: { electionId },
      body: { profilePicture, profile, name },
    } = req;

    const nominee = await models.ElectionNominees.create({
      profilePicture,
      profile,
      name,
      electionId,
    });

    return [201, { nominee }, 'Nominee has been added.'];
  }

  static async getNominees(req) {
    const {
      params: { electionId },
    } = req;

    const nominees = await models.ElectionNominees.findAll({
      where: {
        electionId,
      },
    });

    return [200, { nominees }];
  }

  static async deleteNominee(req) {
    const {
      params: { nomineeId },
    } = req;

    await models.ElectionNominees.destroy({
      where: { id: nomineeId },
    });

    return [200, undefined, 'Nominee has been deleted.'];
  }
}
