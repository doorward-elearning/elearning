import { FindConditions, FindManyOptions, FindOneOptions, ObjectID } from 'typeorm';
import ModelRepository from './model.repository';
import BaseEntity from '../database/entities/base.entity';
import _ from 'lodash';

export default class OrganizationBasedRepository<Entity extends BaseEntity> extends ModelRepository<Entity> {
  /**
   * Finds entities that match given options.
   */
  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
  /**
   * Finds entities that match given conditions.
   */
  find(conditions?: FindConditions<Entity>): Promise<Entity[]>;

  find(options?: any): Promise<Entity[]> {
    return super.find(this.appendOrganizationId(options));
  }

  /**
   * Finds first entity that matches given options.
   */
  findOne(id?: string | number | Date | ObjectID, options?: FindOneOptions<Entity>): Promise<Entity | undefined>;
  /**
   * Finds first entity that matches given options.
   */
  findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined>;
  /**
   * Finds first entity that matches given conditions.
   */
  findOne(conditions?: FindConditions<Entity>, options?: FindOneOptions<Entity>): Promise<Entity | undefined>;

  findOne(arg1?: any, arg2?: any): Promise<Entity | undefined> {
    if (!arg1) {
      return super.findOne(this.appendOrganizationId(arg1));
    }
    if (
      typeof arg1 === 'string' ||
      typeof arg1 === 'number' ||
      arg1 instanceof Date ||
      (arg1 as ObjectID).toHexString
    ) {
      return super.findOne(arg1, this.appendOrganizationId(arg2));
    } else {
      if (arg2) {
        return super.findOne(
          this.appendOrganizationId(arg1) as FindConditions<Entity>,
          this.appendOrganizationId(arg2)
        );
      } else {
        return super.findOne(this.appendOrganizationId(arg1 as FindOneOptions<Entity>));
      }
    }
  }

  /**
   * Finds first entity that matches given options.
   */
  findOneOrFail(id?: string | number | Date | ObjectID, options?: FindOneOptions<Entity>): Promise<Entity>;
  /**
   * Finds first entity that matches given options.
   */
  findOneOrFail(options?: FindOneOptions<Entity>): Promise<Entity>;
  /**
   * Finds first entity that matches given conditions.
   */
  findOneOrFail(conditions?: FindConditions<Entity>, options?: FindOneOptions<Entity>): Promise<Entity>;

  findOneOrFail(arg1?: any, arg2?: any): Promise<Entity> {
    if (!arg1) {
      return super.findOneOrFail(this.appendOrganizationId(arg1));
    }
    if (typeof arg1 === 'string' || typeof arg1 === 'number' || arg1 instanceof Date || arg1 instanceof ObjectID) {
      return super.findOneOrFail(arg1, this.appendOrganizationId(arg2));
    } else {
      if (arg2) {
        return super.findOneOrFail(
          this.appendOrganizationId(arg1) as FindConditions<Entity>,
          this.appendOrganizationId(arg2)
        );
      } else {
        return super.findOneOrFail(this.appendOrganizationId(arg1 as FindOneOptions<Entity>));
      }
    }
  }

  /**
   * Finds entities that match given find options.
   * Also counts all entities that match given conditions,
   * but ignores pagination settings (from and take options).
   */
  findAndCount(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;
  /**
   * Finds entities that match given conditions.
   * Also counts all entities that match given conditions,
   * but ignores pagination settings (from and take options).
   */
  findAndCount(conditions?: FindConditions<Entity>): Promise<[Entity[], number]>;

  findAndCount(options?: any): Promise<[Entity[], number]> {
    return super.findAndCount(this.appendOrganizationId(options));
  }

  /**
   * Finds entities by ids.
   * Optionally find options can be applied.
   */
  findByIds(ids: any[], options?: FindManyOptions<Entity>): Promise<Entity[]>;
  /**
   * Finds entities by ids.
   * Optionally conditions can be applied.
   */
  findByIds(ids: any[], conditions?: FindConditions<Entity>): Promise<Entity[]>;

  findByIds(ids: any[], conditions?: any): Promise<Entity[]> {
    return super.findByIds(ids, this.appendOrganizationId(conditions));
  }

  appendOrganizationId(
    options: FindOneOptions<Entity> | FindManyOptions<Entity>
  ): FindOneOptions<Entity> | FindManyOptions<Entity>;
  appendOrganizationId(conditions: FindConditions<Entity>): FindConditions<Entity>;
  appendOrganizationId(options: any) {
    if (!options) {
      return {
        where: {
          organization: {
            id: process.env.ORGANIZATION_ID,
          },
        },
      };
    }
    if ((options as FindOneOptions<Entity>).where) {
      let where = (options as FindOneOptions<Entity>).where;
      if (where instanceof Array) {
        if (where.length) {
          where = (where as FindConditions<Entity>[]).map((condition) => {
            return _.merge({}, condition, {
              organization: {
                id: process.env.ORGANIZATION_ID,
              },
            });
          });
        } else {
          where = [
            {
              organization: {
                id: process.env.ORGANIZATION_ID,
              },
            },
          ];
        }

        return { ...options, where };
      }
      return _.merge({}, options as FindOneOptions<Entity>, {
        where: {
          organization: {
            id: process.env.ORGANIZATION_ID,
          },
        },
      }) as typeof options;
    } else {
      return _.merge({}, options, {
        organization: {
          id: process.env.ORGANIZATION_ID,
        },
      });
    }
  }
}
