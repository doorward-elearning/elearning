import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderToModules1597646757623 implements MigrationInterface {
  name = 'AddOrderToModules1597646757623';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Modules" ADD "order" integer NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "order" integer NOT NULL DEFAULT 0`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "order"`);
    await queryRunner.query(`ALTER TABLE "Modules" DROP COLUMN "order"`);
  }
}
