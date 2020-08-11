import models from '../../../database/models';

export const validateAddUserToForum = async req => {
  const { params, body } = req;
  const user = await models.User.findOne({
    where: {
      username: body.username,
    },
    include: [
      {
        model: models.Forum,
        as: 'forum',
        where: { id: params.forumId },
        required: true,
      },
    ],
  });

  if (user) {
    return [409, undefined, 'The user already exists in the forum'];
  }
};
