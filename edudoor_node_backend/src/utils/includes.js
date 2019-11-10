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

export const ModuleInclude = [
  {
    model: models.ModuleItem,
    as: 'items',
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
    required: false,
    include: ModuleInclude,
  },
  {
    model: models.User,
    as: 'students',
  },
];

export const StudentsByCourse = courseId => [
  {
    model: models.Course,
    as: 'courses',
    where: {
      id: courseId,
    },
  },
];

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
