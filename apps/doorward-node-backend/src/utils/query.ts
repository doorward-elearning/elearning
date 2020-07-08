import { Op } from 'sequelize';
import express from 'express';

export const searchField = (field, value = '', Model) => {
  return Model.findOne({
    where: {
      [field]: {
        [Op.iLike]: `%${value.trim()}%`,
      },
    },
  });
};

export const searchQuery = (req: express.Request, fields: Array<string>) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const { query } = req;

  const search = query.search || '';

  const where = fields.reduce((acc, field) => {
    return {
      ...acc,
      [field]: {
        [Op.iLike]: `%${search.trim()}%`,
      },
    };
  }, {});

  return { [Op.or]: where };
};
