import models from '../../database/models';
import { Op } from 'sequelize';

export const validateCreateForum = async req => {
  const {
    user: { organizationId },
  } = req;
  const forum = await models.Forum.findOne({
    where: {
      title: req.body.title,
    },
    include: [
      {
        model: models.User,
        as: 'author',
        where: {
          organizationId,
        },
      },
    ],
  });

  req
    .checkBody('title')
    .custom(() => !forum)
    .withMessage('A forum with this title already exists');
};

export const validateUpdateForum = async req => {
  const {
    user: { organizationId },
    params: { forumId },
  } = req;
  const forum = await models.Forum.findOne({
    where: {
      title: req.body.title,
      id: {
        [Op.ne]: forumId,
      },
    },
    include: [
      {
        model: models.User,
        as: 'author',
        where: {
          organizationId,
        },
      },
    ],
  });

  req
    .checkBody('title')
    .notEmpty()
    .withMessage('The forum title is required.')
    .custom(() => !forum)
    .withMessage('A forum with this title already exists');
};

export const validateForumExists = (key = 'forumId') => async req => {
  const forumId = req.params[key];
  const forum = await models.Forum.findByPk(forumId);

  if (!forum) {
    return [404, undefined, 'Forum does not exist'];
  }
};

export const validateMeetingRoomExists = (key = 'forumId') => async req => {
  const forumId = req.params[key];
  const room = await models.MeetingRoom.findOne({
    where: {
      forumId,
      status: 'STARTED',
    },
  });
  if (room) {
    return [404, undefined, 'Live classroom for this forum already exists.'];
  }
};
