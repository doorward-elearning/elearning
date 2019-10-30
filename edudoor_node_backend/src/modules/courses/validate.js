import models from '../../database/models';

export const validateCreateCourse = async req => {
  const {
    user: { organizationId },
  } = req;
  const course = await models.Course.findOne({
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
    .custom(() => !course)
    .withMessage('A course with this title already exists');
};
