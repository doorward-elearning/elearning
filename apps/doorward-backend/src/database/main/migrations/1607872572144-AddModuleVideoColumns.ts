import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddModuleVideoColumns1607872572144 implements MigrationInterface {
  name = 'AddModuleVideoColumns1607872572144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "videoURL" character varying`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "description" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "videoURL"`);
  }
}
