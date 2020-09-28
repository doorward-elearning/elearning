import { MigrationInterface, QueryRunner } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';

export class UpdatePages1601273001422 implements MigrationInterface {
  name = 'UpdatePages1601273001422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "page" text`);
    await queryRunner.query(`UPDATE "ModuleItems" SET "page" = "content" WHERE type = $1;`, [ModuleItemType.PAGE]);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "content"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "content" text`);
    await queryRunner.query(`UPDATE "ModuleItems" SET "content" = "page" WHERE type = $1;`, [ModuleItemType.PAGE]);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "page"`);
  }
}
