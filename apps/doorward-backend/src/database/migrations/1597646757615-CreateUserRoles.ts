import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoles1597646757615 implements MigrationInterface {
  name = 'CreateUserRoles1597646757615';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "UserRoles" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" character varying, "roleId" character varying, CONSTRAINT "PK_a44a2382829972daa2a31345f56" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_a6b832f61ba4bd959c838a1953b" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_5f1d6fdea1024424fd60b193b9f" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "UserRoles" DROP CONSTRAINT IF EXISTS "FK_5f1d6fdea1024424fd60b193b9f"`);
    await queryRunner.query(`ALTER TABLE "UserRoles" DROP CONSTRAINT IF EXISTS "FK_a6b832f61ba4bd959c838a1953b"`);
    await queryRunner.query(`DROP TABLE "UserRoles"`);
  }
}
