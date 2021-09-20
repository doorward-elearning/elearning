import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializeDatabase1630652857482 implements MigrationInterface {
    name = 'InitializeDatabase1630652857482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "Organizations_meetingplatform_enum" AS ENUM('Openvidu', 'Jitsi')`);
        await queryRunner.query(`CREATE TYPE "Organizations_customertype_enum" AS ENUM('school-india', 'school-international', 'college-india', 'college-international', 'institute-india', 'institute-international', 'corporate-india', 'corporate-international')`);
        await queryRunner.query(`CREATE TABLE "Organizations" ("id" character varying NOT NULL, "name" character varying NOT NULL, "displayName" character varying NOT NULL, "description" character varying, "hosts" character varying NOT NULL, "descriptiveLogo" boolean NOT NULL DEFAULT false, "darkThemeLogo" character varying, "meetingPlatform" "Organizations_meetingplatform_enum" NOT NULL DEFAULT 'Openvidu', "customerType" "Organizations_customertype_enum" NOT NULL DEFAULT 'college-india', "logo" character varying, "databaseName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_de5935b2a69bb0d9c76f71754bd" UNIQUE ("name"), CONSTRAINT "PK_e0690a31419f6666194423526f2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Organizations"`);
        await queryRunner.query(`DROP TYPE "Organizations_customertype_enum"`);
        await queryRunner.query(`DROP TYPE "Organizations_meetingplatform_enum"`);
    }

}
