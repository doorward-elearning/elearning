import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseManager1597731967036 implements MigrationInterface {
  name = 'CreateCourseManager1597731967036';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "CourseManagers" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "organizationId" character varying, "managerId" character varying, "courseId" character varying, "creatorId" character varying, CONSTRAINT "PK_5ac8a15f18123f060bf48af2adc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "CourseManagers" ADD CONSTRAINT "FK_589aca480c62c360a11ce713d97" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "CourseManagers" ADD CONSTRAINT "FK_53cd6620411b338552f07818a6f" FOREIGN KEY ("managerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "CourseManagers" ADD CONSTRAINT "FK_3c2a68c61e11b2e2e1c4ab6cde9" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "CourseManagers" ADD CONSTRAINT "FK_1cc0e118ff08bc1187f58b050d1" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "CourseManagers" DROP CONSTRAINT IF EXISTS "FK_1cc0e118ff08bc1187f58b050d1"`);
    await queryRunner.query(`ALTER TABLE "CourseManagers" DROP CONSTRAINT IF EXISTS "FK_3c2a68c61e11b2e2e1c4ab6cde9"`);
    await queryRunner.query(`ALTER TABLE "CourseManagers" DROP CONSTRAINT IF EXISTS "FK_53cd6620411b338552f07818a6f"`);
    await queryRunner.query(`ALTER TABLE "CourseManagers" DROP CONSTRAINT IF EXISTS "FK_589aca480c62c360a11ce713d97"`);
    await queryRunner.query(`DROP TABLE "CourseManagers"`);
  }
}
