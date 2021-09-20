import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrganizationConfig1630655379356 implements MigrationInterface {
    name = 'CreateOrganizationConfig1630655379356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "Configurations_key_enum" AS ENUM('meeting', 'meeting_interface')`);
        await queryRunner.query(`CREATE TABLE "Configurations" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "key" "Configurations_key_enum" NOT NULL, "value" text, "organizationId" character varying, CONSTRAINT "UQ_f3ce91b0635d798c6ecd17dfa50" UNIQUE ("key"), CONSTRAINT "PK_07f0562e3292e084a7e835c4405" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Configurations" ADD CONSTRAINT "FK_ebae0722b38c24e17e4348edfd8" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Configurations" DROP CONSTRAINT "FK_ebae0722b38c24e17e4348edfd8"`);
        await queryRunner.query(`DROP TABLE "Configurations"`);
        await queryRunner.query(`DROP TYPE "Configurations_key_enum"`);
    }

}
