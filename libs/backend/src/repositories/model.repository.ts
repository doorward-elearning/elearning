import { Brackets, DeepPartial, QueryRunner, Repository } from 'typeorm';
import BaseEntity from '@doorward/common/entities/base.entity';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

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
}
