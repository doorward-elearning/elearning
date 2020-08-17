import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser20191028184408 implements MigrationInterface {
  name = 'CreateUser20191028184408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "zipCode" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "gender" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'Pending Activation', "organizationId" character varying, CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username"), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_1612823a86e1cc991e52bd8b664" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "FK_1612823a86e1cc991e52bd8b664"`);
    await queryRunner.query(`DROP TABLE "Users"`);
  }
}
