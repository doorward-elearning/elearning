import BaseValidator from '../../../middleware/BaseValidator';
import models from '../../../database/models';

export const validateMemberExists = BaseValidator.modelExists(
  (req: any) => {
    const {
      params: { memberId },
    } = req;
    return {
      id: memberId,
    };
  },
  models.User,
  'Member does not exist'
);
