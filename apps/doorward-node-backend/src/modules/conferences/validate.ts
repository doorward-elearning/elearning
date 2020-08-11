import models from '../../database/models';
import { Op } from 'sequelize';

export const validateCreateConference = async req => {
  const {
    user: { organizationId },
  } = req;
  const conference = await models.Conference.findOne({
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
    .custom(() => !conference)
    .withMessage('A conference with this title already exists');
};

export const validateUpdateConference = async req => {
  const {
    user: { organizationId },
    params: { conferenceId },
  } = req;
  const conference = await models.Conference.findOne({
    where: {
      title: req.body.title,
      id: {
        [Op.ne]: conferenceId,
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
    .withMessage('The conference title is required.')
    .custom(() => !conference)
    .withMessage('A conference with this title already exists');
};

export const validateConferenceExists = (key = 'conferenceId') => async req => {
  const conferenceId = req.params[key];
  const conference = await models.Conference.findByPk(conferenceId);

  if (!conference) {
    return [404, undefined, 'Conference does not exist'];
  }
};

export const validateMeetingRoomExists = (key = 'conferenceId') => async req => {
  const conferenceId = req.params[key];
  const room = await models.MeetingRoom.findOne({
    where: {
      conferenceId,
      status: 'STARTED',
    },
  });
  if (room) {
    return [404, undefined, 'Live classroom for this conference already exists.'];
  }
};
