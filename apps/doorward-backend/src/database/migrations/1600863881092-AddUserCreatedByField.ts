import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserCreatedByField1600863881092 implements MigrationInterface {
    name = 'AddUserCreatedByField1600863881092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "createdById" character varying`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_856956eb7e126c05fe0c9082051" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_856956eb7e126c05fe0c9082051"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "createdById"`);
    }

}
