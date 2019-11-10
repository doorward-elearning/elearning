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

export const validateModuleExists = async req => {
  const {
    params: { courseId, moduleId: id },
  } = req;
  const module = await models.Module.findOne({
    where: {
      courseId,
      id,
    },
  });
  if (!module) {
    return [404, undefined, 'Course module does not exist or has been deleted.'];
  }
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

export const validateModuleItem = async ({ body, params, ...req }) => {
  const item = await models.ModuleItem.findOne({
    where: {
      title: body.title || '',
      moduleId: params.moduleId,
    },
  });
  req
    .checkBody('title')
    .notEmpty()
    .withMessage('The title is required')
    .custom(() => !item)
    .withMessage('There exists a module item with this title');
  req
    .checkBody('content')
    .notEmpty()
    .withMessage('Module item content is required.');
};
