import models from '../../../database/models';

export const validateManagerExists = (key = 'managerId') => async req => {
  const id = req.body[key];
  const manager = await models.User.findByPk(id);

  if (!manager) {
    return [404, undefined, 'Forum manager does not exist.'];
  }
};
