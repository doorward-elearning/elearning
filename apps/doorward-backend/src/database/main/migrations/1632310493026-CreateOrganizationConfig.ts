import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrganizationConfig1632310493026 implements MigrationInterface {
    name = 'CreateOrganizationConfig1632310493026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Configurations" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "key" text NOT NULL, "value" text, CONSTRAINT "UQ_f3ce91b0635d798c6ecd17dfa50" UNIQUE ("key"), CONSTRAINT "PK_07f0562e3292e084a7e835c4405" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Configurations"`);
    }

}
