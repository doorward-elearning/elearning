import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniquenessFromTableConstraints1597731110653 implements MigrationInterface {
  name = 'RemoveUniquenessFromTableConstraints1597731110653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Organizations" ADD CONSTRAINT "UQ_de5935b2a69bb0d9c76f71754bd" UNIQUE ("name")`
    );
    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "UQ_ffc81a3b97dcbf8e320d5106c0d"`);
    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "UQ_3c3ab3f49a87e6ddb607f3c4945"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email")`);
    await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username")`);
    await queryRunner.query(`ALTER TABLE "Organizations" DROP CONSTRAINT IF EXISTS "UQ_de5935b2a69bb0d9c76f71754bd"`);
  }
}
