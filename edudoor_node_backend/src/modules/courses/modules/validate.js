import { Op } from 'sequelize';
import models from '../../../database/models';

export const validateCourseModule = async req => {
  const { body, params } = req;
  const module = await models.Module.findOne({
    where: {
      title: body.title,
      courseId: params.courseId,
    },
  });

  req
    .checkBody('title')
    .notEmpty()
    .withMessage('Course title is required')
    .custom(() => !module)
    .withMessage('There already exists a module with that title.');
};

export const validateUpdateModule = async req => {
  const { body, params } = req;
  const module = await models.Module.findOne({
    where: {
      title: body.title,
      courseId: params.courseId,
      id: {
        [Op.ne]: params.moduleId,
      },
    },
  });

  req
    .checkBody('title')
    .notEmpty()
    .withMessage('Course title is required')
    .custom(() => !module)
    .withMessage('There already exists another module with that title.');
};
