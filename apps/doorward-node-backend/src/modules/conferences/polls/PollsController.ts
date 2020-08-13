import models from '../../../database/models';

export default class PollsController {
  static async createPoll(req) {
    const {
      body: { title, choices, startDate, endDate },
      user,
      params: { conferenceId },
    } = req;

    const poll = await models.Poll.create({
      title,
      createdBy: user.id,
      conferenceId,
      startDate,
      endDate,
    });

    await Promise.all(
      choices.map(async choice => {
        return models.PollOptions.create({
          option: choice,
          pollId: poll.id,
        });
      })
    );

    return [201, { poll }, 'Poll has been created successfully.'];
  }

  static async getPolls(req) {
    const {
      params: { conferenceId },
    } = req;

    const polls = await models.Poll.findAll({
      where: {
        conferenceId,
      },
      include: [
        {
          model: models.PollOptions,
          as: 'options',
        },
      ],
    });

    return [200, { polls }];
  }

  static async vote(req) {
    const {
      params: { conferenceId, pollId },
      body: { optionId },
      user,
    } = req;

    await models.PollVote.findOrCreate({
      defaults: {
        voterId: user.id,
        optionId,
      },
      where: {
        optionId,
        voterId: user.id,
      },
    });

    return [200, 'Vote successful.'];
  }
}
