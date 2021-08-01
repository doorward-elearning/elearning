import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConfigurationToQuestion1627644469352 implements MigrationInterface {
    name = 'AddConfigurationToQuestion1627644469352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "config"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Questions" ADD "config" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Questions" ALTER COLUMN "config" DROP NOT NULL;`)
    }

}
