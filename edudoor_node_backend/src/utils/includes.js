import models from '../database/models';

const User = [
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

export default {
  User,
};
