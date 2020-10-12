import { Brackets, DeepPartial, EntitySchema, ObjectType, QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import BaseEntity from '@doorward/common/entities/base.entity';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { PaginationQuery } from '@doorward/common/dtos/query';
import { PaginatedEntities, PaginationMetaData } from '@doorward/common/dtos/response/base.response';

export default class ModelRepository<Entity extends BaseEntity | OrganizationEntity> extends Repository<Entity> {
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
}
