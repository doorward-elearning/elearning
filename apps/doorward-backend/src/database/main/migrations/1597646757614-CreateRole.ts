import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRole1597646757614 implements MigrationInterface {
  name = 'CreateRole1597646757614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Roles" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text NOT NULL, "organizationId" character varying, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Roles" ADD CONSTRAINT "FK_6f4bf6e1d7b9fbb3a8824e2d9ac" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Roles" DROP CONSTRAINT IF EXISTS "FK_6f4bf6e1d7b9fbb3a8824e2d9ac"`);
    await queryRunner.query(`DROP TABLE "Roles"`);
  }
}
