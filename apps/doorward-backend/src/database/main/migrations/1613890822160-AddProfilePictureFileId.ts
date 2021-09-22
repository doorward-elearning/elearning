import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProfilePictureFileId1613890822160 implements MigrationInterface {
    name = 'AddProfilePictureFileId1613890822160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "profilePictureFileId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "profilePictureFileId"`);
    }

}
