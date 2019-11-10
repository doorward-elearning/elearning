import { Op } from 'sequelize';

class Tools {
  static appendPath(path = '', another = '') {
    const first = path.endsWith('/') ? path : `${path}/`;
    const second = another.startsWith('/') ? another.substr(1) : another;

    return first + second;
  }

  static useQuery(...fields) {
    return req => {
      const where = {};
      Object.keys(req.query)
        .filter(f => fields.includes(f) && !!req.query[f])
        .forEach(q => {
          where[Op.or] = {
            ...(where[Op.or] || {}),
            [q]: {
              [Op.iLike]: `%${req.query[q]}%`,
            },
          };
        });

      req.searchFields = where;
    };
  }
}

export default Tools;
