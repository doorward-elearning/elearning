import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoleSetupStatus1632132294055 implements MigrationInterface {
    name = 'AddRoleSetupStatus1632132294055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "Organizations_rolessetupstatus_enum" AS ENUM('PENDING', 'DONE')`);
        await queryRunner.query(`ALTER TABLE "Organizations" ADD "rolesSetupStatus" "Organizations_rolessetupstatus_enum" NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Organizations" DROP COLUMN "rolesSetupStatus"`);
        await queryRunner.query(`DROP TYPE "Organizations_rolessetupstatus_enum"`);
    }

}
