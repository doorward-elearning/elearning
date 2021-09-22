import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUsernameUnique1632312132123 implements MigrationInterface {
  name = 'MakeUsernameUnique1632312132123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "DiscussionGroups" DROP CONSTRAINT "FK_29d2bd8f4495b41649d63934db6"`);
    await queryRunner.query(
      `ALTER TABLE "DiscussionGroups" ADD CONSTRAINT "FK_29d2bd8f4495b41649d63934db6" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );

    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT "FK_591df46e6be606df67c9dd1cec9"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD CONSTRAINT "FK_591df46e6be606df67c9dd1cec9" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_856956eb7e126c05fe0c9082051"`);
    await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_856956eb7e126c05fe0c9082051" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);

    await queryRunner.query(`ALTER TABLE "DiscussionGroupComments" DROP CONSTRAINT "FK_f8b7fdf175b5da5b4a28593f99b"`);
    await queryRunner.query(`ALTER TABLE "DiscussionGroupComments" ADD CONSTRAINT "FK_f8b7fdf175b5da5b4a28593f99b" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6"`);
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6" FOREIGN KEY ("assessmentId") REFERENCES "ModuleItems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

    // Delete duplicate rows first
    await queryRunner.query(
      `DELETE FROM "Users" a USING "Users" b WHERE a."createdAt" > b."createdAt" AND a.username = b.username`
    );
    await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d"`);
  }
}
