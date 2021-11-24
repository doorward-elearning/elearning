import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserSessions1637233744712 implements MigrationInterface {
  name = 'CreateUserSessions1637233744712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "UserSessions" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "ipAddress" character varying, "authToken" character varying NOT NULL, "userId" character varying, CONSTRAINT "UQ_3777a85cc30e6f0a637e53a6f96" UNIQUE ("authToken"), CONSTRAINT "PK_fc1b1b2631e3785c5b203283e12" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "UserSessions" ADD CONSTRAINT "FK_2a9651cb9d358458955e7baf59a" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "UserSessions" DROP CONSTRAINT "FK_2a9651cb9d358458955e7baf59a"`);
    await queryRunner.query(`DROP TABLE "UserSessions"`);
  }
}
