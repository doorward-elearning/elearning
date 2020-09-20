import { QueryRunner, Repository } from 'typeorm';
import BaseEntity from '@doorward/common/entities/base.entity';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

export default class ModelRepository<Entity extends BaseEntity | OrganizationEntity> extends Repository<Entity> {
  createSearchQueryBuilder(alias: string, fields: Array<string>, search?: string, queryRunner?: QueryRunner) {
    let queryBuilder = this.createQueryBuilder(alias, queryRunner);

    fields.forEach((field, index) => {
      queryBuilder = queryBuilder[index === 0 ? 'andWhere' : 'orWhere'](`"${alias}"."${field}" ILIKE :search`, {
        search: '%' + search + '%',
      });
    });
    return queryBuilder;
  }
}
