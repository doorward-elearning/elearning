import { MigrationInterface, QueryRunner } from 'typeorm';
import { restoreOrganizations, restoreUsers } from '../sequelize/etl';
import { TABLES } from './1497735758507-BackupSequelizeData';

export class RestoreSequelizeData1597750103447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await restoreOrganizations(queryRunner);
    await restoreUsers(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      TABLES.reverse().map(async (table) => {
        const tableExists = await queryRunner.query(
          `SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${table}'`
        );
        if (tableExists) {
          await queryRunner.query(`DELETE FROM public."${table}"`);
        }
      })
    );
  }
}
