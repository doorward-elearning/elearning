import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFile1597729404442 implements MigrationInterface {
  name = 'CreateFile1597729404442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Files" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "public" boolean NOT NULL, "publicUrl" character varying NOT NULL, "organizationId" character varying, "ownerId" character varying, CONSTRAINT "PK_e7e496de757cb609f7043c09f4a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Files" ADD CONSTRAINT "FK_1221481278810083fabc00998a2" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Files" ADD CONSTRAINT "FK_80083c4fa0180a63e3c929a0f41" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Files" DROP CONSTRAINT IF EXISTS "FK_80083c4fa0180a63e3c929a0f41"`);
    await queryRunner.query(`ALTER TABLE "Files" DROP CONSTRAINT IF EXISTS "FK_1221481278810083fabc00998a2"`);
    await queryRunner.query(`DROP TABLE "Files"`);
  }
}
