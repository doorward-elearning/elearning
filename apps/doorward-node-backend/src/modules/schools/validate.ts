import models from '../../database/models';
import { searchField } from '../../utils/query';

export const validateCreateSchool = async req => {
  req.checkBody('name', 'The school name is required.').notEmpty();
  req.checkBody('email', 'The school email is required.').notEmpty();
  req.checkBody('phoneNumber', 'The schools phone number is required').notEmpty();

  const school = await searchField('name', req.body.name, models.School);

  req.checkBody('name', 'A school with this name already exists').custom(() => !school);

  const schoolByEmail = await searchField('email', req.body.email, models.School);
  req.checkBody('email', 'A school with this email already exists').custom(() => !schoolByEmail);

  const schoolByPhone = await searchField('phoneNumber', req.body.phoneNumber, models.School);
  req.checkBody('phoneNumber', 'A school with this phone number already exists').custom(() => !schoolByPhone);
};

export const validateCreateClassroom = async req => {
  req.checkBody('name', 'The classroom name is required').notEmpty();

  const classrooms = await models.ClassRoom.findAll({
    where: {
      schoolId: req.params.schoolId,
    },
  });
  console.log(classrooms);

  if (classrooms.length >= 2) {
    return [400, undefined, 'You can only create a maximum of 2 classrooms per school'];
  }
};
