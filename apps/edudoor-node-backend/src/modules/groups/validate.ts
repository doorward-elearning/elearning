import BaseValidator from '../../middleware/BaseValidator';
import models from '../../database/models';

export const validateCreateGroup = req => {
  req.checkBody('name', 'The group name is required').notEmpty();
};

export const validateAddUserToGroup = req => {
  req
    .checkBody('members', 'The members are required')
    .notEmpty()
    .withMessage('The members should be a list of user ids');
};

export const validateGroupExists = req => {
  const {
    params: { groupId },
  } = req;

  return BaseValidator.modelExists(() => ({ id: groupId }), models.Group, 'The group does not exist');
};
