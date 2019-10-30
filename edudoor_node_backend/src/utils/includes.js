import models from '../database/models';

export const UserInclude = [
  {
    model: models.Organization,
    as: 'organization',
  },
  {
    model: models.Role,
    as: 'roles',
    through: { attributes: [] },
  },
];

export const CourseInclude = [
  {
    model: models.User,
    as: 'author',
  },
  {
    model: models.Module,
    as: 'modules',
  },
];
