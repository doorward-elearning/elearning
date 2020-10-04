import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDiscussionGroups1601844041026 implements MigrationInterface {
  name = 'AddDiscussionGroups1601844041026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "DiscussionGroupComments" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "comment" text NOT NULL, "organizationId" character varying NOT NULL, "authorId" character varying, "discussionGroupId" character varying, CONSTRAINT "PK_bbc9ad777f94a80a6826ed4b943" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "DiscussionGroups" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" text NOT NULL, "organizationId" character varying NOT NULL, "courseId" character varying, "creatorId" character varying, CONSTRAINT "PK_d84e856c887282a619c8d518165" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TYPE "public"."ModuleItems_type_enum" RENAME TO "ModuleItems_type_enum_old"`);
    await queryRunner.query(`CREATE TYPE "ModuleItems_type_enum" AS ENUM('Page', 'Assignment', 'Quiz', 'File')`);
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ALTER COLUMN "type" TYPE "ModuleItems_type_enum" USING "type"::"text"::"ModuleItems_type_enum"`
    );
    await queryRunner.query(`DROP TYPE "ModuleItems_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "DiscussionGroupComments" ADD CONSTRAINT "FK_284fe25783622bcc480d86eca4e" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "DiscussionGroupComments" ADD CONSTRAINT "FK_f8b7fdf175b5da5b4a28593f99b" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "DiscussionGroupComments" ADD CONSTRAINT "FK_48be993f28e12dcf3e0c95c3149" FOREIGN KEY ("discussionGroupId") REFERENCES "DiscussionGroups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "DiscussionGroups" ADD CONSTRAINT "FK_60202a59ece6c1a43758e018c7e" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "DiscussionGroups" ADD CONSTRAINT "FK_a5b887cdae3a3e9e347c1817444" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "DiscussionGroups" ADD CONSTRAINT "FK_29d2bd8f4495b41649d63934db6" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "DiscussionGroups" DROP CONSTRAINT "FK_29d2bd8f4495b41649d63934db6"`);
    await queryRunner.query(`ALTER TABLE "DiscussionGroups" DROP CONSTRAINT "FK_a5b887cdae3a3e9e347c1817444"`);
    await queryRunner.query(`ALTER TABLE "DiscussionGroups" DROP CONSTRAINT "FK_60202a59ece6c1a43758e018c7e"`);
    await queryRunner.query(`ALTER TABLE "DiscussionGroupComments" DROP CONSTRAINT "FK_48be993f28e12dcf3e0c95c3149"`);
    await queryRunner.query(`ALTER TABLE "DiscussionGroupComments" DROP CONSTRAINT "FK_f8b7fdf175b5da5b4a28593f99b"`);
    await queryRunner.query(`ALTER TABLE "DiscussionGroupComments" DROP CONSTRAINT "FK_284fe25783622bcc480d86eca4e"`);
    await queryRunner.query(
      `CREATE TYPE "ModuleItems_type_enum_old" AS ENUM('Page', 'Assignment', 'Quiz', 'File', 'Discussion Forum')`
    );
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ALTER COLUMN "type" TYPE "ModuleItems_type_enum_old" USING "type"::"text"::"ModuleItems_type_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "ModuleItems_type_enum"`);
    await queryRunner.query(`ALTER TYPE "ModuleItems_type_enum_old" RENAME TO  "ModuleItems_type_enum"`);
    await queryRunner.query(`DROP TABLE "DiscussionGroups"`);
    await queryRunner.query(`DROP TABLE "DiscussionGroupComments"`);
  }
}
