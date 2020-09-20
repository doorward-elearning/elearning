import { Brackets, QueryRunner, Repository } from 'typeorm';
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
}
