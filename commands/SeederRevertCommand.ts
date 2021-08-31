import * as yargs from 'yargs';
import { Connection, ConnectionOptionsReader, createConnection } from 'typeorm';

const chalk = require('chalk');

export default class SeederRevertCommand implements yargs.CommandModule {
  command = 'seeder:revert';
  describe = 'Reverts last executed seed.';

  builder(args: yargs.Argv) {
    return args
      .option('c', {
        alias: 'connection',
        default: 'default',
        describe: 'Name of the connection on which run a query.',
      })
      .option('transaction', {
        alias: 't',
        default: 'default',
        describe: 'Indicates if transaction should be used or not for seed revert. Enabled by default.',
      })
      .option('f', {
        alias: 'config',
        default: 'ormconfig',
        describe: 'Name of the file with connection configuration.',
      });
  }

  async handler(args: yargs.Arguments) {
    let connection: Connection | undefined = undefined;
    try {
      const connectionOptionsReader = new ConnectionOptionsReader({
        root: process.cwd(),
        configName: args.config as any,
      });
      const connectionOptions: any = await connectionOptionsReader.get(args.connection as any);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      Object.assign(connectionOptions, {
        subscribers: [],
        synchronize: false,
        migrationsRun: false,
        dropSchema: false,
        logging: ['query', 'error', 'schema'],
        migrations: connectionOptions.seeds,
        cli: {
          ...connectionOptions.cli,
          migrationsDir: connectionOptions.cli.seederDir,
        },
        migrationsTableName: connectionOptions.seedersTableName || 'seeds',
      });
      connection = await createConnection(connectionOptions);

      const options = {
        transaction: 'all' as 'all' | 'none' | 'each',
      };

      switch (args.t) {
        case 'all':
          options.transaction = 'all';
          break;
        case 'none':
        case 'false':
          options.transaction = 'none';
          break;
        case 'each':
          options.transaction = 'each';
          break;
        default:
        // noop
      }

      await connection.undoLastMigration(options);
      await connection.close();
    } catch (err) {
      if (connection) await (connection as Connection).close();

      console.log(chalk.black.bgRed('Error during seeder revert:'));
      console.error(err);
      process.exit(1);
    }
  }
}
