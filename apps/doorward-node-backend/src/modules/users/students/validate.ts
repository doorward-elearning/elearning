import BaseValidator from '../../../middleware/BaseValidator';
import models from '../../../database/models';

export const validateStudentExists = BaseValidator.modelExists(
  req => {
    const {
      params: {
        studentId
      }
    } = req;
    return {
      id: studentId,
    };
  },
  models.User,
  'Student does not exist'
);
