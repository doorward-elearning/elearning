import { EntityManager, MigrationInterface, QueryRunner } from 'typeorm';

export default abstract class SeederInterface implements MigrationInterface {
  down(queryRunner: QueryRunner): Promise<any> {
    return this.rollback(queryRunner.manager);
  }

  up(queryRunner: QueryRunner): Promise<any> {
    return this.seed(queryRunner.manager);
  }

  public abstract seed(entityManager: EntityManager): Promise<any>;

  public abstract rollback(entityManager: EntityManager): Promise<any>;
}
