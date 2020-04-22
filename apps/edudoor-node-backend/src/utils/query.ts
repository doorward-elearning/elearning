import { Op } from 'sequelize';

export const searchField = (field, value = '', Model) => {
  return Model.findOne({
    where: {
      [field]: {
        [Op.iLike]: `%${value.trim()}%`,
      },
    },
  });
};
