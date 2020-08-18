import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssignmentSubmission1597730298667 implements MigrationInterface {
  name = 'CreateAssignmentSubmission1597730298667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "AssignmentSubmissions_type_enum" AS ENUM('Text Entry', 'Website URL', 'Media Recording', 'File Upload')`
    );
    await queryRunner.query(
      `CREATE TYPE "AssignmentSubmissions_resubmission_enum" AS ENUM('Draft', 'Submitted', 'Graded', 'Resubmit')`
    );
    await queryRunner.query(
      `CREATE TABLE "AssignmentSubmissions" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "type" "AssignmentSubmissions_type_enum" NOT NULL, "submission" text NOT NULL, "points" integer NOT NULL DEFAULT 0, "resubmission" "AssignmentSubmissions_resubmission_enum" NOT NULL DEFAULT 'Draft', "numResubmissions" integer NOT NULL DEFAULT 0, "gradedOn" TIMESTAMP, "resubmittedOn" TIMESTAMP, "grade" integer NOT NULL DEFAULT 0, "organizationId" character varying, "studentId" character varying, "assignmentId" character varying, "graderId" character varying, CONSTRAINT "PK_505d4c3a6e848eb7298fdf787b8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" ADD CONSTRAINT "FK_65674b3b65b4ac62cd73e4a8ee1" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" ADD CONSTRAINT "FK_29aad69ab378d607bc3a095112a" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" ADD CONSTRAINT "FK_e960fd1048a74b69a96e3055e87" FOREIGN KEY ("assignmentId") REFERENCES "ModuleItems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" ADD CONSTRAINT "FK_49a680107b3d3e95d083964236f" FOREIGN KEY ("graderId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" DROP CONSTRAINT IF EXISTS "FK_49a680107b3d3e95d083964236f"`
    );
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" DROP CONSTRAINT IF EXISTS "FK_e960fd1048a74b69a96e3055e87"`
    );
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" DROP CONSTRAINT IF EXISTS "FK_29aad69ab378d607bc3a095112a"`
    );
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" DROP CONSTRAINT IF EXISTS "FK_65674b3b65b4ac62cd73e4a8ee1"`
    );
    await queryRunner.query(`DROP TABLE "AssignmentSubmissions"`);
    await queryRunner.query(`DROP TYPE "AssignmentSubmissions_resubmission_enum"`);
    await queryRunner.query(`DROP TYPE "AssignmentSubmissions_type_enum"`);
  }
}
