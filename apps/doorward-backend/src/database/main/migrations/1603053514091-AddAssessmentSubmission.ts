import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAssessmentSubmission1603053514091 implements MigrationInterface {
  name = 'AddAssessmentSubmission1603053514091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "AssessmentSubmission_status_enum" AS ENUM('Draft', 'Submitted', 'Graded')`);
    await queryRunner.query(
      `CREATE TABLE "AssessmentSubmission" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "submission" text NOT NULL, "assessmentTime" integer NOT NULL DEFAULT 0, "status" "AssessmentSubmission_status_enum" NOT NULL DEFAULT 'Draft', "gradedOn" TIMESTAMP, "submittedOn" TIMESTAMP, "grade" integer NOT NULL DEFAULT 0, "organizationId" character varying NOT NULL, "studentId" character varying, "assessmentId" character varying, "graderId" character varying, CONSTRAINT "REL_7bf45a696fee8696ddaaa5c98a" UNIQUE ("assessmentId"), CONSTRAINT "PK_376e287ab1a7d376d4c0a6ee604" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_10c34cc42407f48a424f969ba3e" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_d2a7dd7897a2b7542896fe17d61" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6" FOREIGN KEY ("assessmentId") REFERENCES "ModuleItems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_ad0f0c2212e83ee904a264909ac" FOREIGN KEY ("graderId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_ad0f0c2212e83ee904a264909ac"`);
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6"`);
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_d2a7dd7897a2b7542896fe17d61"`);
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_10c34cc42407f48a424f969ba3e"`);
    await queryRunner.query(`DROP TABLE "AssessmentSubmission"`);
    await queryRunner.query(`DROP TYPE "AssessmentSubmission_status_enum"`);
  }
}
