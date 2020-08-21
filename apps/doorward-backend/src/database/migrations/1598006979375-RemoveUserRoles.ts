import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserRoles1598006979375 implements MigrationInterface {
  name = 'RemoveUserRoles1598006979375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = await queryRunner.query(`SELECT * FROM "UserRoles"`);

    await queryRunner.query(`ALTER TABLE "UserRoles" DROP CONSTRAINT IF EXISTS "FK_5f1d6fdea1024424fd60b193b9f"`);
    await queryRunner.query(`ALTER TABLE "UserRoles" DROP CONSTRAINT IF EXISTS "FK_a6b832f61ba4bd959c838a1953b"`);
    await queryRunner.query(`DROP TABLE "UserRoles"`);
    await queryRunner.query(`ALTER TABLE "Users" ADD "roleId" character varying`);
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_65c56db5a9988b90b0d7245e0f0" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await Promise.all(
      roles.map(async ({ roleId, userId }) => {
        await queryRunner.query(`UPDATE "Users" SET "roleId" = $1 WHERE "id" = $2`, [roleId, userId]);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roles = await queryRunner.query(`SELECT id, "roleId", "organizationId" FROM "Users"`);
    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "FK_65c56db5a9988b90b0d7245e0f0"`);
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN IF EXISTS "roleId"`);
    await queryRunner.query(
      `CREATE TABLE "UserRoles" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" character varying, "roleId" character varying, CONSTRAINT "PK_a44a2382829972daa2a31345f56" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_a6b832f61ba4bd959c838a1953b" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_5f1d6fdea1024424fd60b193b9f" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await Promise.all(
      roles.map(async ({ id, roleId, organizationId }) => {
        await queryRunner.query(`INSERT INTO "UserRoles" VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, $1, $2, $3)`, [
          id,
          roleId,
          organizationId,
        ]);
      })
    );
  }
}
