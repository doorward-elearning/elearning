import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFileReferenceToModuleItems1607864256754 implements MigrationInterface {
  name = 'AddFileReferenceToModuleItems1607864256754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "fileId" character varying`);
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ADD CONSTRAINT "UQ_37bfc623c08817de198fb34e0f9" UNIQUE ("fileId")`
    );
    await queryRunner.query(`ALTER TYPE "public"."ModuleItems_type_enum" RENAME TO "ModuleItems_type_enum_old"`);
    await queryRunner.query(
      `CREATE TYPE "ModuleItems_type_enum" AS ENUM('Page', 'Assignment', 'Assessment', 'File', 'Video')`
    );
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ALTER COLUMN "type" TYPE "ModuleItems_type_enum" USING "type"::"text"::"ModuleItems_type_enum"`
    );
    await queryRunner.query(`DROP TYPE "ModuleItems_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ADD CONSTRAINT "FK_37bfc623c08817de198fb34e0f9" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT "FK_37bfc623c08817de198fb34e0f9"`);
    await queryRunner.query(
      `CREATE TYPE "ModuleItems_type_enum_old" AS ENUM('Page', 'Assignment', 'Assessment', 'File')`
    );
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ALTER COLUMN "type" TYPE "ModuleItems_type_enum_old" USING "type"::"text"::"ModuleItems_type_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "ModuleItems_type_enum"`);
    await queryRunner.query(`ALTER TYPE "ModuleItems_type_enum_old" RENAME TO  "ModuleItems_type_enum"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT "UQ_37bfc623c08817de198fb34e0f9"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "fileId"`);
  }
}
