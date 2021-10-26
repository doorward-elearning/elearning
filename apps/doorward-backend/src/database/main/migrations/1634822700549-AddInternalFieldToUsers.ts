import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInternalFieldToUsers1634822700549 implements MigrationInterface {
  name = 'AddInternalFieldToUsers1634822700549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" ADD "internal" boolean NOT NULL DEFAULT true`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "internal"`);
  }
}
