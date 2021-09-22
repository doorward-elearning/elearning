import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrganizationFields1597729210582 implements MigrationInterface {
  name = 'AddOrganizationFields1597729210582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Organizations" ADD "icon" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Organizations" DROP COLUMN "icon"`);
  }
}
