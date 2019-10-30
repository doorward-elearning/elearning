import _ from 'lodash';
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

export const ModuleInclude = [];

export const MyCoursesInclude = organizationId =>
  _.merge(CourseInclude, [
    {
      model: models.User,
      as: 'author',
      where: {
        organizationId,
      },
    },
  ]);
