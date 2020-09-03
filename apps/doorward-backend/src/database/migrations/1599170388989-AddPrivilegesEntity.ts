import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrivilegesEntity1599170388989 implements MigrationInterface {
  name = 'AddPrivilegesEntity1599170388989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Privileges" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, CONSTRAINT "PK_40b588a42b3cc7c391da8f0d459" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "RolePrivileges" ("roleId" character varying NOT NULL, "privilegeId" character varying NOT NULL, CONSTRAINT "PK_9f1ed27d0757f85206735a6aaf1" PRIMARY KEY ("roleId", "privilegeId"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_da7883bac8dd3800913034503f" ON "RolePrivileges" ("roleId") `);
    await queryRunner.query(`CREATE INDEX "IDX_ee6ab0a664f9f0e55c560c6102" ON "RolePrivileges" ("privilegeId") `);
    await queryRunner.query(
      `ALTER TABLE "RolePrivileges" ADD CONSTRAINT "FK_da7883bac8dd3800913034503f1" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "RolePrivileges" ADD CONSTRAINT "FK_ee6ab0a664f9f0e55c560c61025" FOREIGN KEY ("privilegeId") REFERENCES "Privileges"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "RolePrivileges" DROP CONSTRAINT "FK_ee6ab0a664f9f0e55c560c61025"`);
    await queryRunner.query(`ALTER TABLE "RolePrivileges" DROP CONSTRAINT "FK_da7883bac8dd3800913034503f1"`);
    await queryRunner.query(`DROP INDEX "IDX_ee6ab0a664f9f0e55c560c6102"`);
    await queryRunner.query(`DROP INDEX "IDX_da7883bac8dd3800913034503f"`);
    await queryRunner.query(`DROP TABLE "RolePrivileges"`);
    await queryRunner.query(`DROP TABLE "Privileges"`);
  }
}
