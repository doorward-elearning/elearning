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

export const validateCourseExists = (key = 'courseId') => async req => {
  const courseId = req.params[key];
  const course = await models.Course.findByPk(courseId);

  if (!course) {
    return [404, undefined, 'Course does not exist'];
  }
};
