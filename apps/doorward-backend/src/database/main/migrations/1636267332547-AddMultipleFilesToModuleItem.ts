import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMultipleFilesToModuleItem1636267332547 implements MigrationInterface {
  name = 'AddMultipleFilesToModuleItem1636267332547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT "FK_37bfc623c08817de198fb34e0f9"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT "UQ_37bfc623c08817de198fb34e0f9"`);
    const moduleItems = await queryRunner.query(`SELECT id, "fileId" FROM "ModuleItems" WHERE "fileId" IS NOT NULL`);

    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "fileId"`);
    await queryRunner.query(`ALTER TABLE "Files" ADD "moduleItemId" character varying`);
    await queryRunner.query(
      `ALTER TABLE "Files" ADD CONSTRAINT "FK_7e6c33a0f65b4832b3eb0b2aa99" FOREIGN KEY ("moduleItemId") REFERENCES "ModuleItems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );

    await Promise.all(
      moduleItems.map(async (item) => {
        await queryRunner.query(`UPDATE "Files" SET "moduleItemId" = $1 WHERE id = $2`, [item.id, item.fileId]);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const files = await queryRunner.query(`SELECT id, "moduleItemId" FROM "Files" WHERE "moduleItemId" IS NOT NULL`);

    await queryRunner.query(`ALTER TABLE "Files" DROP CONSTRAINT "FK_7e6c33a0f65b4832b3eb0b2aa99"`);
    await queryRunner.query(`ALTER TABLE "Files" DROP COLUMN "moduleItemId"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "fileId" character varying`);
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ADD CONSTRAINT "UQ_37bfc623c08817de198fb34e0f9" UNIQUE ("fileId")`
    );

    await Promise.all(
      files.map(async (file) => {
        await queryRunner.query(`UPDATE "ModuleItems" SET "fileId" = $1 WHERE id = $2`, [file.id, file.moduleItemId]);
      })
    );

    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ADD CONSTRAINT "FK_37bfc623c08817de198fb34e0f9" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }
}
