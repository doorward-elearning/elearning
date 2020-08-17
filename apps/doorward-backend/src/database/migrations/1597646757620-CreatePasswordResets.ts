import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePasswordResets1597646757620 implements MigrationInterface {
  name = 'CreatePasswordResets1597646757620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "PasswordResets" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "token" text NOT NULL, "userId" character varying, CONSTRAINT "PK_33354473e5779242018084d9577" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "PasswordResets" ADD CONSTRAINT "FK_f7662630e24658b39fafd90eeef" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "PasswordResets" DROP CONSTRAINT IF EXISTS "FK_f7662630e24658b39fafd90eeef"`);
    await queryRunner.query(`DROP TABLE "PasswordResets"`);
  }
}
