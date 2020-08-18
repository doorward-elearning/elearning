import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrganizationFields1597731036114 implements MigrationInterface {
  name = 'AddOrganizationFields1597731036114';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Organizations" ADD "link" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Organizations" ADD "darkThemeIcon" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Organizations" DROP COLUMN "darkThemeIcon"`);
    await queryRunner.query(`ALTER TABLE "Organizations" DROP COLUMN "link"`);
  }
}
