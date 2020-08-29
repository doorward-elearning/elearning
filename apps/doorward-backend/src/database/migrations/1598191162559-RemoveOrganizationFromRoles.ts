import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveOrganizationFromRoles1598191162559 implements MigrationInterface {
  name = 'RemoveOrganizationFromRoles1598191162559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Roles" DROP CONSTRAINT "FK_6f4bf6e1d7b9fbb3a8824e2d9ac"`);
    await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "organizationId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Roles" ADD "organizationId" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Roles" ADD CONSTRAINT "FK_6f4bf6e1d7b9fbb3a8824e2d9ac" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
