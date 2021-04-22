import {MigrationInterface, QueryRunner} from "typeorm";

export class AddQuestionSectionEntity1619004502096 implements MigrationInterface {
    name = 'AddQuestionSectionEntity1619004502096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "QuestionSections" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "instructions" text, "points" integer NOT NULL DEFAULT 0, "config" text NOT NULL, "order" integer NOT NULL DEFAULT 0, "organizationId" character varying NOT NULL, "assessmentId" character varying, CONSTRAINT "PK_9235e8e19a22d7ebbb8122f8128" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Questions" ADD "sectionId" character varying`);
        await queryRunner.query(`ALTER TABLE "Modules" DROP CONSTRAINT "FK_819272f527248e89cc9e4e22d3f"`);
        await queryRunner.query(`ALTER TABLE "Modules" ALTER COLUMN "courseId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_d2a7dd7897a2b7542896fe17d61"`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6"`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ALTER COLUMN "studentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ALTER COLUMN "assessmentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Modules" ADD CONSTRAINT "FK_819272f527248e89cc9e4e22d3f" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "QuestionSections" ADD CONSTRAINT "FK_13ae843d4be7f19d73bd879ee39" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "QuestionSections" ADD CONSTRAINT "FK_91fddd4b7c8f5a9ed24a8a79b5a" FOREIGN KEY ("assessmentId") REFERENCES "ModuleItems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Questions" ADD CONSTRAINT "FK_dc40c58792ab39a9754972f54df" FOREIGN KEY ("sectionId") REFERENCES "QuestionSections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_d2a7dd7897a2b7542896fe17d61" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6" FOREIGN KEY ("assessmentId") REFERENCES "ModuleItems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6"`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_d2a7dd7897a2b7542896fe17d61"`);
        await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT "FK_dc40c58792ab39a9754972f54df"`);
        await queryRunner.query(`ALTER TABLE "QuestionSections" DROP CONSTRAINT "FK_91fddd4b7c8f5a9ed24a8a79b5a"`);
        await queryRunner.query(`ALTER TABLE "QuestionSections" DROP CONSTRAINT "FK_13ae843d4be7f19d73bd879ee39"`);
        await queryRunner.query(`ALTER TABLE "Modules" DROP CONSTRAINT "FK_819272f527248e89cc9e4e22d3f"`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ALTER COLUMN "assessmentId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ALTER COLUMN "studentId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6" FOREIGN KEY ("assessmentId") REFERENCES "ModuleItems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_d2a7dd7897a2b7542896fe17d61" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Modules" ALTER COLUMN "courseId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Modules" ADD CONSTRAINT "FK_819272f527248e89cc9e4e22d3f" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "sectionId"`);
        await queryRunner.query(`DROP TABLE "QuestionSections"`);
    }

}
