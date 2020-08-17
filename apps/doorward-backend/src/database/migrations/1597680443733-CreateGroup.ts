import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGroup1597680443733 implements MigrationInterface {
  name = 'CreateGroup1597680443733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Groups" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "type" character varying NOT NULL, "createdBy" character varying, "organizationId" character varying, CONSTRAINT "PK_be8543c3ec161e109d124cf9498" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Groups" ADD CONSTRAINT "FK_6e79fe439029d8b47071c5ba638" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Groups" ADD CONSTRAINT "FK_a90075be409849b37aee9c9610f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT IF EXISTS "FK_a90075be409849b37aee9c9610f"`);
    await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT IF EXISTS "FK_6e79fe439029d8b47071c5ba638"`);
    await queryRunner.query(`DROP TABLE "Groups"`);
  }
}
