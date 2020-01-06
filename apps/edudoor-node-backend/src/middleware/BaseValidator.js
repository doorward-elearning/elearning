import _ from 'lodash';
import { Op } from 'sequelize';

export default class BaseValidator {
  static async checkField(req, field, Model, message) {
    const exists = await Model.findOne({
      where: {
        [field]: req.body[field],
      },
      raw: true,
    });
    req
      .checkBody(field, message || `${_.capitalize(_.startCase(field))} should be unique`)
      .custom(() => exists === null);
  }

  static createSearchFields(fields, search) {
    return {
      [Op.or]: fields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: {
            [Op.iLike]: `%${search}%`,
          },
        }),
        {}
      ),
    };
  }

  static validate(schema) {
    return async req => {
      await schema(req);
    };
  }

  static uniqueFields(fields, Model) {
    return async req =>
      Promise.all(Object.keys(fields).map(async field => BaseValidator.checkField(req, field, Model, fields[field])));
  }

  static findModelOrThrow(param, Model, message) {
    return BaseValidator.modelExists(
      req => ({
        id: req.params[param],
      }),
      Model,
      message
    );
  }

  static modelExists(query, Model, message) {
    return async req => {
      const throwError = () => {
        let msg = message;
        if (!msg) {
          msg = `${Model.name} not found`;
        }
        req.errorStatus = 404;
        throw new Error(msg);
      };

      const found = await Model.findOne({ where: query(req) });
      if (!found) {
        throwError();
      } else {
        req.model = { [Model.name.toLowerCase()]: found };
      }
    };
  }

  static errorHandler(res, errors, next) {
    if (errors) {
      return [
        422,
        {
          errors: errors.reduce((acc, error) => ({ ...acc, [error.param]: error.msg }), {}),
        },
        'Validation error',
      ];
    }
    next();
  }

  static requiredFields(all, oneOrMany) {
    return req => {
      const checkField = (field, dataSource = 'body') => {
        const message = `${_.capitalize(_.startCase(field))} cannot be empty`;
        req[`check${_.capitalize(dataSource)}`](field, message).notEmpty();
      };

      const checkAll = (input, dataSource = 'body') => {
        input.forEach(field => {
          checkField(field, dataSource);
        });
      };

      const checkOneOrMany = (input, dataSource = 'body') => {
        const fields = input.some(field => req[dataSource][field]);
        if (!fields) {
          checkAll(input, dataSource);
        }
      };

      const { body, params, query } = all;

      if (oneOrMany) {
        const { body: bodyEither, params: paramsEither } = oneOrMany;
        if (bodyEither) checkOneOrMany(bodyEither);
        if (paramsEither) checkOneOrMany(paramsEither);
        if (oneOrMany instanceof Array) checkOneOrMany(oneOrMany);
      }

      if (body) checkAll(body);
      if (params) checkAll(params, 'params');
      if (query) checkAll(query, 'query');
      if (all instanceof Array) checkAll(all);
    };
  }

  static fields(...fields) {
    return async req => {
      req.body = _.pick(req.body, fields);
      req.body = _.pickBy(req.body, _.identity);
    };
  }

  static excludeFields(...fields) {
    return async req => {
      fields.forEach(field => delete req.body[field]);
    };
  }

  static withErrorHandler(Validator) {
    return async (req, res, next) => {
      try {
        let result = await Validator(req, res, next);

        if (req.validationErrors()) {
          const newResult = BaseValidator.errorHandler(res, req.validationErrors(), next);
          if (result) {
            newResult[1] = _.merge(newResult[1], result[1]);
          }
          result = newResult;
        }
        if (result && result.length > 0 && result[0]) {
          const [statusCode, data, message, meta] = result;
          res.status(statusCode).json({
            success: statusCode < 400,
            message,
            ...data,
            meta,
          });
        } else {
          next();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(req.errorStatus || 500).json({
          success: false,
          message: req.errorStatus ? error.message : 'Server error, please try again!',
          debugMessage: req.errorStatus ? undefined : error.stack,
        });
      }
    };
  }
}