import models from '../../../database/models';

export const validateAddUserToConference = async req => {
  const { params, body } = req;
  const user = await models.User.findOne({
    where: {
      username: body.username,
    },
    include: [
      {
        model: models.Conference,
        as: 'conference',
        where: { id: params.conferenceId },
        required: true,
      },
    ],
  });

  if (user) {
    return [409, undefined, 'The user already exists in the conference'];
  }
};
