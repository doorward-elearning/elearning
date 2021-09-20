import { ConnectionManager } from 'typeorm';
import * as ormconfig from '../../../../ormconfig.js';
import * as path from 'path';
import * as fs from 'fs';
import * as colors from 'colors';

const connect = async () => {
  const connectionManager = new ConnectionManager();
  const connection = await connectionManager.create(ormconfig as any);

  await connection.connect();

  return connectionManager;
};

const convertMigrations = async () => {
  const connectionManager = await connect();

  const queryRunner = connectionManager.get();

  const tableExists = await queryRunner.query(
    `SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'SequelizeMeta'`
  );

  if (tableExists && tableExists.length) {
    const results = (await queryRunner.query(`SELECT * FROM "SequelizeMeta"`)) as Array<{ name: string }>;
    const typeORMMigrations = fs.readdirSync(path.join(__dirname, '../migrations/'));

    const data = results.map((migration, index) => {
      const typeORM = typeORMMigrations[index];
      const split = typeORM.replace('.ts', '').split('-');
      const timestamp = split[0];
      const migrationName = split[1];

      return { timestamp, migrationName };
    });

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS migrations
(
    id SERIAL NOT NULL CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    name VARCHAR NOT NULL
)`);

    await Promise.all(
      data.map(async (migration) => {
        const name = migration.migrationName + migration.timestamp;
        return queryRunner.query(`INSERT INTO "migrations" VALUES (DEFAULT, '${migration.timestamp}', '${name}')`);
      })
    );

    await queryRunner.query(`DROP TABLE "SequelizeMeta"`);
  }

  await queryRunner.close();
};

convertMigrations().then(() => {
  console.log(colors.cyan('Successfully migrated from Sequelize to TypeORM'));
});
