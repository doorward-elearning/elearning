import models from '../../../database/models';

export const validateAddUserToCourse = async req => {
  const { params, body } = req;
  const user = await models.User.findOne({
    where: {
      username: body.username,
    },
    include: [
      {
        model: models.Course,
        as: 'course',
        where: { id: params.courseId },
        required: true,
      },
    ],
  });

  if (user) {
    return [409, undefined, 'The user already exists in the course'];
  }
};
