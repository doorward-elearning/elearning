import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserRequirements1602139268188 implements MigrationInterface {
  name = 'UpdateUserRequirements1602139268188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" ADD "phoneNumber" character varying`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "firstName" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "lastName" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "email" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "email" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "lastName" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "firstName" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "phoneNumber"`);
  }
}
