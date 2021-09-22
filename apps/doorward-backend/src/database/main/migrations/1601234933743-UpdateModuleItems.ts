import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateModuleItems1601234933743 implements MigrationInterface {
    name = 'UpdateModuleItems1601234933743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_0bbcb64776af272a4b2e0fdb4d" ON "ModuleItems" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_0bbcb64776af272a4b2e0fdb4d"`);
    }

}
