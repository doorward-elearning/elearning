import { Op } from 'sequelize';
import randomString from 'random-string';

const SimpleCrypto = require('simple-crypto-js').default;

const simpleCrypto = new SimpleCrypto(process.env.DATA_ENCRYPTION_KEY);

class Tools {
  static appendPath(path = '', another = '') {
    const first = path.endsWith('/') ? path : `${path}/`;
    const second = another.startsWith('/') ? another.substr(1) : another;

    return first + second;
  }

  static randomString(length = 6) {
    return randomString({
      length,
      numeric: true,
      letters: true,
    });
  }

  static encrypt(str = '') {
    try {
      return simpleCrypto.encrypt(str);
    } catch (err) {
      return '';
    }
  }

  static decrypt(str = '') {
    try {
      return simpleCrypto.decrypt(str);
    } catch (err) {
      return '';
    }
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
