import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModuleItem1597646757619 implements MigrationInterface {
  name = 'CreateModuleItem1597646757619';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "ModuleItems_type_enum" AS ENUM('Page', 'Assignment', 'Quiz', 'File', 'Discussion Forum')`
    );
    await queryRunner.query(
      `CREATE TABLE "ModuleItems" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "content" text NOT NULL, "type" "ModuleItems_type_enum" NOT NULL, "moduleId" character varying, "createdBy" character varying, CONSTRAINT "PK_ac8ebb987976ff9165f7ff6050b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ADD CONSTRAINT "FK_43dd94d05b6b4a657d8008ec372" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ADD CONSTRAINT "FK_591df46e6be606df67c9dd1cec9" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT "FK_591df46e6be606df67c9dd1cec9"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT "FK_43dd94d05b6b4a657d8008ec372"`);
    await queryRunner.query(`DROP TABLE "ModuleItems"`);
    await queryRunner.query(`DROP TYPE "ModuleItems_type_enum"`);
  }
}
