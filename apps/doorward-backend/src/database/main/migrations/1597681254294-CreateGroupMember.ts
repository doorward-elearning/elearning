import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGroupMember1597681254294 implements MigrationInterface {
  name = 'CreateGroupMember1597681254294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT IF EXISTS "FK_6e79fe439029d8b47071c5ba638"`);
    await queryRunner.query(`CREATE TYPE "GroupMembers_role_enum" AS ENUM('Administrator', 'Member')`);
    await queryRunner.query(
      `CREATE TABLE "GroupMembers" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" "GroupMembers_role_enum" NOT NULL DEFAULT 'Member', "userId" character varying, "groupId" character varying, "addedBy" character varying, CONSTRAINT "PK_3dbe4bce2ac3b8d9ed99371000e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_a70b5d3d0ffb8e50f1b151962a3" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_620c0c144747b4a30137427ffd9" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_eec6c56dcfcae6d3f24e325cd72" FOREIGN KEY ("addedBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Groups" ADD CONSTRAINT "FK_99a38bd7adba412daa8be562f32" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT IF EXISTS "FK_99a38bd7adba412daa8be562f32"`);
    await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT IF EXISTS "FK_eec6c56dcfcae6d3f24e325cd72"`);
    await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT IF EXISTS "FK_620c0c144747b4a30137427ffd9"`);
    await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT IF EXISTS "FK_a70b5d3d0ffb8e50f1b151962a3"`);
    await queryRunner.query(`DROP TABLE "GroupMembers"`);
    await queryRunner.query(`DROP TYPE "GroupMembers_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "Groups" ADD CONSTRAINT "FK_6e79fe439029d8b47071c5ba638" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
