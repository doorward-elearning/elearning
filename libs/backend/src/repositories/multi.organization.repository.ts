import {
  Brackets,
  Connection,
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityMetadata,
  EntitySchema,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  InsertResult,
  ObjectID,
  ObjectType,
  QueryRunner,
  RemoveOptions,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import BaseEntity from '@doorward/common/entities/base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Inject } from '@nestjs/common';
import { RequestScopedInjectable } from '@doorward/backend/decorators/request.scoped.service.decorator';
import { ORGANIZATION_CONNECTION } from '@doorward/backend/constants';
import { PaginationQuery } from '@doorward/common/dtos/query';
import { PaginatedEntities, PaginationMetaData } from '@doorward/common/dtos/response/base.response';

@RequestScopedInjectable()
export default abstract class MultiOrganizationRepository<Entity extends BaseEntity> {
  constructor(@Inject(ORGANIZATION_CONNECTION) private readonly connection: Connection) {
    const repository = connection.getRepository(this.getEntity());

    this.metadata = repository.metadata;
    this.manager = connection.manager;
    this.queryRunner = connection.manager.queryRunner;
  }

  public abstract getEntity(): ObjectType<Entity>;

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  /**
   * Entity Manager used by this repository.
   */
  readonly manager: EntityManager;

  /**
   * Entity metadata of the entity current repository manages.
   */
  readonly metadata: EntityMetadata;

  /**
   * Query runner provider used for this repository.
   */
  readonly queryRunner?: QueryRunner;

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Creates a new query builder that can be used to build a sql query.
   */
  createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity> {
    return this.manager.createQueryBuilder<Entity>(
      this.metadata.target as any,
      alias || this.metadata.targetName,
      queryRunner || this.queryRunner
    );
  }

  createSearchQueryBuilder(alias: string, fields: Array<string>, search?: string, queryRunner?: QueryRunner) {
    const queryBuilder = this.createQueryBuilder(alias, queryRunner);

    queryBuilder.andWhere(
      new Brackets((qb) => {
        fields.forEach((field) => {
          qb.orWhere(`"${alias}"."${field}" ILIKE :search`, {
            search: '%' + (search || '') + '%',
          });
        });
      })
    );

    return queryBuilder;
  }

  async paginate(
    queryBuilder: SelectQueryBuilder<Entity>,
    pagination: PaginationQuery
  ): Promise<PaginatedEntities<Entity>> {
    let paginationMetaData = undefined;
    let entities = [];

    if (pagination.noPagination) {
      paginationMetaData = undefined;
      entities = await queryBuilder.getMany();
    } else {
      paginationMetaData = new PaginationMetaData();
      const page = +(pagination.page || 1);
      const limit = +pagination.limit || +process.env.ITEMS_PER_PAGE;

      const offset = (page - 1) * limit;

      queryBuilder.offset(offset).limit(limit);

      const [data, count] = await queryBuilder.getManyAndCount();

      entities = data;

      paginationMetaData.page = page;
      paginationMetaData.totalPages = Math.round(Math.ceil(count / limit));
      paginationMetaData.totalCount = count;
      paginationMetaData.count = data?.length || 0;
    }

    return { entities, pagination: paginationMetaData };
  }

  findOneByField<K extends keyof Entity>(field: K, fieldValue: Entity[K]) {
    return this.findOne({
      where: {
        [field]: fieldValue,
      },
    });
  }

  createAndSave(): Promise<Entity>;
  createAndSave(entityLikeArray: DeepPartial<Entity>[]): Promise<Entity[]>;
  createAndSave(entityLike: DeepPartial<Entity>): Promise<Entity>;
  createAndSave(entity?: any): Promise<Entity | Entity[]> {
    return this.save(this.create(entity) as any);
  }

  getRepository<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity> {
    return this.manager.getRepository(target);
  }

  /**
   * Returns object that is managed by this repository.
   * If this repository manages entity from schema,
   * then it returns a name of that schema instead.
   */
  get target(): Function | string {
    return this.metadata.target;
  }

  /**
   * Checks if entity has an id.
   * If entity composite compose ids, it will check them all.
   */
  hasId(entity: Entity): boolean {
    return this.manager.hasId(this.metadata.target, entity);
  }

  /**
   * Gets entity mixed id.
   */
  getId(entity: Entity): any {
    return this.manager.getId(this.metadata.target, entity);
  }

  /**
   * Creates a new entity instance.
   */
  create(): Entity;

  /**
   * Creates new entities and copies all entity properties from given objects into their new entities.
   * Note that it copies only properties that are present in entity schema.
   */
  create(entityLikeArray: DeepPartial<Entity>[]): Entity[];

  /**
   * Creates a new entity instance and copies all entity properties from this object into a new entity.
   * Note that it copies only properties that are present in entity schema.
   */
  create(entityLike: DeepPartial<Entity>): Entity;

  /**
   * Creates a new entity instance or instances.
   * Can copy properties from the given object into new entities.
   */
  create(plainEntityLikeOrPlainEntityLikes?: DeepPartial<Entity> | DeepPartial<Entity>[]): Entity | Entity[] {
    return this.manager.create<any>(this.metadata.target as any, plainEntityLikeOrPlainEntityLikes as any);
  }

  /**
   * Merges multiple entities (or entity-like objects) into a given entity.
   */
  merge(mergeIntoEntity: Entity, ...entityLikes: DeepPartial<Entity>[]): Entity {
    return this.manager.merge(this.metadata.target as any, mergeIntoEntity, ...entityLikes);
  }

  /**
   * Creates a new entity from the given plain javascript object. If entity already exist in the database, then
   * it loads it (and everything related to it), replaces all values with the new ones from the given object
   * and returns this new entity. This new entity is actually a loaded from the db entity with all properties
   * replaced from the new object.
   *
   * Note that given entity-like object must have an entity id / primary key to find entity by.
   * Returns undefined if entity with given id was not found.
   */
  preload(entityLike: DeepPartial<Entity>): Promise<Entity | undefined> {
    return this.manager.preload(this.metadata.target as any, entityLike);
  }

  /**
   * Saves all given entities in the database.
   * If entities do not exist in the database then inserts, otherwise updates.
   */
  save<T extends DeepPartial<Entity>>(entities: T[], options: SaveOptions & { reload: false }): Promise<T[]>;

  /**
   * Saves all given entities in the database.
   * If entities do not exist in the database then inserts, otherwise updates.
   */
  save<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<(T & Entity)[]>;

  /**
   * Saves a given entity in the database.
   * If entity does not exist in the database then inserts, otherwise updates.
   */
  save<T extends DeepPartial<Entity>>(entity: T, options: SaveOptions & { reload: false }): Promise<T>;

  /**
   * Saves a given entity in the database.
   * If entity does not exist in the database then inserts, otherwise updates.
   */
  save<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity>;

  /**
   * Saves one or many given entities.
   */
  save<T extends DeepPartial<Entity>>(entityOrEntities: T | T[], options?: SaveOptions): Promise<T | T[]> {
    return this.manager.save<Entity, T>(this.metadata.target as any, entityOrEntities as any, options);
  }

  /**
   * Removes a given entities from the database.
   */
  remove(entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;

  /**
   * Removes a given entity from the database.
   */
  remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;

  /**
   * Removes one or many given entities.
   */
  remove(entityOrEntities: Entity | Entity[], options?: RemoveOptions): Promise<Entity | Entity[]> {
    return this.manager.remove(this.metadata.target as any, entityOrEntities as any, options);
  }

  /**
   * Records the delete date of all given entities.
   */
  softRemove<T extends DeepPartial<Entity>>(entities: T[], options: SaveOptions & { reload: false }): Promise<T[]>;

  /**
   * Records the delete date of all given entities.
   */
  softRemove<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<(T & Entity)[]>;

  /**
   * Records the delete date of a given entity.
   */
  softRemove<T extends DeepPartial<Entity>>(entity: T, options: SaveOptions & { reload: false }): Promise<T>;

  /**
   * Records the delete date of a given entity.
   */
  softRemove<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity>;

  /**
   * Records the delete date of one or many given entities.
   */
  softRemove<T extends DeepPartial<Entity>>(entityOrEntities: T | T[], options?: SaveOptions): Promise<T | T[]> {
    return this.manager.softRemove<Entity, T>(this.metadata.target as any, entityOrEntities as any, options);
  }

  /**
   * Recovers all given entities in the database.
   */
  recover<T extends DeepPartial<Entity>>(entities: T[], options: SaveOptions & { reload: false }): Promise<T[]>;

  /**
   * Recovers all given entities in the database.
   */
  recover<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<(T & Entity)[]>;

  /**
   * Recovers a given entity in the database.
   */
  recover<T extends DeepPartial<Entity>>(entity: T, options: SaveOptions & { reload: false }): Promise<T>;

  /**
   * Recovers a given entity in the database.
   */
  recover<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity>;

  /**
   * Recovers one or many given entities.
   */
  recover<T extends DeepPartial<Entity>>(entityOrEntities: T | T[], options?: SaveOptions): Promise<T | T[]> {
    return this.manager.recover<Entity, T>(this.metadata.target as any, entityOrEntities as any, options);
  }

  /**
   * Inserts a given entity into the database.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient INSERT query.
   * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
   */
  insert(entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]): Promise<InsertResult> {
    return this.manager.insert(this.metadata.target as any, entity);
  }

  /**
   * Updates entity partially. Entity can be found by a given conditions.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient UPDATE query.
   * Does not check if entity exist in the database.
   */
  update(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>
  ): Promise<UpdateResult> {
    return this.manager.update(this.metadata.target as any, criteria as any, partialEntity);
  }

  /**
   * Deletes entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient DELETE query.
   * Does not check if entity exist in the database.
   */
  delete(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>
  ): Promise<DeleteResult> {
    return this.manager.delete(this.metadata.target as any, criteria as any);
  }

  /**
   * Records the delete date of entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   */
  softDelete(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>
  ): Promise<UpdateResult> {
    return this.manager.softDelete(this.metadata.target as any, criteria as any);
  }

  /**
   * Restores entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   */
  restore(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>
  ): Promise<UpdateResult> {
    return this.manager.restore(this.metadata.target as any, criteria as any);
  }

  /**
   * Counts entities that match given options.
   */
  count(options?: FindManyOptions<Entity>): Promise<number>;

  /**
   * Counts entities that match given conditions.
   */
  count(conditions?: FindConditions<Entity>): Promise<number>;

  /**
   * Counts entities that match given find options or conditions.
   */
  count(optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<number> {
    return this.manager.count(this.metadata.target as any, optionsOrConditions as any);
  }

  /**
   * Finds entities that match given options.
   */
  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;

  /**
   * Finds entities that match given conditions.
   */
  find(conditions?: FindConditions<Entity>): Promise<Entity[]>;

  /**
   * Finds entities that match given find options or conditions.
   */
  find(optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<Entity[]> {
    return this.manager.find(this.metadata.target as any, optionsOrConditions as any);
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

  /**
   * Finds entities that match given find options or conditions.
   * Also counts all entities that match given conditions,
   * but ignores pagination settings (from and take options).
   */
  findAndCount(optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<[Entity[], number]> {
    return this.manager.findAndCount(this.metadata.target as any, optionsOrConditions as any);
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

  /**
   * Finds entities by ids.
   * Optionally find options can be applied.
   */
  findByIds(ids: any[], optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<Entity[]> {
    return this.manager.findByIds(this.metadata.target as any, ids, optionsOrConditions as any);
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

  /**
   * Finds first entity that matches given conditions.
   */
  findOne(
    optionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Entity> | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>
  ): Promise<Entity | undefined> {
    return this.manager.findOne(this.metadata.target as any, optionsOrConditions as any, maybeOptions);
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

  /**
   * Finds first entity that matches given conditions.
   */
  findOneOrFail(
    optionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Entity> | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>
  ): Promise<Entity> {
    return this.manager.findOneOrFail(this.metadata.target as any, optionsOrConditions as any, maybeOptions);
  }

  /**
   * Executes a raw SQL query and returns a raw database results.
   * Raw query execution is supported only by relational databases (MongoDB is not supported).
   */
  query(query: string, parameters?: any[]): Promise<any> {
    return this.manager.query(query, parameters);
  }

  /**
   * Clears all the data from the given table/collection (truncates/drops it).
   *
   * Note: this method uses TRUNCATE and may not work as you expect in transactions on some platforms.
   * @see https://stackoverflow.com/a/5972738/925151
   */
  clear(): Promise<void> {
    return this.manager.clear(this.metadata.target);
  }

  /**
   * Increments some column by provided value of the entities matched given conditions.
   */
  increment(conditions: FindConditions<Entity>, propertyPath: string, value: number | string): Promise<UpdateResult> {
    return this.manager.increment(this.metadata.target, conditions, propertyPath, value);
  }

  /**
   * Decrements some column by provided value of the entities matched given conditions.
   */
  decrement(conditions: FindConditions<Entity>, propertyPath: string, value: number | string): Promise<UpdateResult> {
    return this.manager.decrement(this.metadata.target, conditions, propertyPath, value);
  }
}
