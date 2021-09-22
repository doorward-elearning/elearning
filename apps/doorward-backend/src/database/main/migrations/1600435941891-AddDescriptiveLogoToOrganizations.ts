import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDescriptiveLogoToOrganizations1600435941891 implements MigrationInterface {
    name = 'AddDescriptiveLogoToOrganizations1600435941891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Organizations" ADD "descriptiveLogo" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Organizations" DROP COLUMN "descriptiveLogo"`);
    }

}
