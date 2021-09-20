import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudentCourses1597646757618 implements MigrationInterface {
  name = 'CreateStudentCourses1597646757618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "StudentCourses_status_enum" AS ENUM('Pending Approval', 'Ongoing', 'Completed', 'Called off', 'Suspended', 'Expelled')`
    );
    await queryRunner.query(
      `CREATE TABLE "StudentCourses" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "status" "StudentCourses_status_enum" NOT NULL, "studentId" character varying, "courseId" character varying, CONSTRAINT "PK_74e7af7308764cec5dab5b483db" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "gender"`);
    await queryRunner.query(`CREATE TYPE "Users_gender_enum" AS ENUM('Male', 'Female', 'Rather not say')`);
    await queryRunner.query(`ALTER TABLE "Users" ADD "gender" "Users_gender_enum" NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Courses" DROP COLUMN "status"`);
    await queryRunner.query(`CREATE TYPE "Courses_status_enum" AS ENUM('Draft', 'Published', 'Unpublished')`);
    await queryRunner.query(`ALTER TABLE "Courses" ADD "status" "Courses_status_enum" NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "StudentCourses" ADD CONSTRAINT "FK_0f612dc08095c2689a684f26fe0" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "StudentCourses" ADD CONSTRAINT "FK_d43e3e27a43c10491d08f223da7" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "StudentCourses" DROP CONSTRAINT IF EXISTS "FK_d43e3e27a43c10491d08f223da7"`);
    await queryRunner.query(`ALTER TABLE "StudentCourses" DROP CONSTRAINT IF EXISTS "FK_0f612dc08095c2689a684f26fe0"`);
    await queryRunner.query(`ALTER TABLE "Courses" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "Courses_status_enum"`);
    await queryRunner.query(`ALTER TABLE "Courses" ADD "status" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "Users_gender_enum"`);
    await queryRunner.query(`ALTER TABLE "Users" ADD "gender" character varying NOT NULL`);
    await queryRunner.query(`DROP TABLE "StudentCourses"`);
    await queryRunner.query(`DROP TYPE "StudentCourses_status_enum"`);
  }
}
