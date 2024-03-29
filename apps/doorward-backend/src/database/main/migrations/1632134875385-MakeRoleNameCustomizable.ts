import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeRoleNameCustomizable1632134875385 implements MigrationInterface {
  name = 'MakeRoleNameCustomizable1632134875385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = await queryRunner.query(`SELECT * FROM "Roles"`);
    await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "name"`);
    await queryRunner.query(`DROP TYPE "public"."Roles_name_enum"`);
    await queryRunner.query(`ALTER TABLE "Roles" ADD "name" character varying`);
    await Promise.all(
      roles.map(async (role) => {
        await queryRunner.query(`UPDATE "Roles" SET name = $1 WHERE id = $2`, [role.name, role.id]);
      })
    );
    await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "name" SET NOT NULL `);
    await queryRunner.query(`ALTER TABLE "Roles" ADD CONSTRAINT "UQ_8eadedb8470c92966389ecc2165" UNIQUE ("name")`);
    await queryRunner.query(`ALTER TABLE "QuestionSections" ALTER COLUMN "config" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "QuestionSections" ALTER COLUMN "config" SET DEFAULT '{}'`);
    await queryRunner.query(`ALTER TABLE "Roles" DROP CONSTRAINT "UQ_8eadedb8470c92966389ecc2165"`);
    await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "name"`);
    await queryRunner.query(
      `CREATE TYPE "public"."Roles_name_enum" AS ENUM('SUPER_ADMINISTRATOR', 'TEACHER', 'STUDENT')`
    );
    await queryRunner.query(`ALTER TABLE "Roles" ADD "name" "Roles_name_enum" NOT NULL`);
  }
}
