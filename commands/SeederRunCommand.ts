import * as yargs from 'yargs';
import { Connection, ConnectionOptionsReader, createConnection } from 'typeorm';
const chalk = require('chalk');

export default class SeederRunCommand implements yargs.CommandModule {
  command = 'seeder:run';
  describe = 'Runs all pending seeds.';

  builder(args: yargs.Argv) {
    return args
      .option('connection', {
        alias: 'c',
        default: 'default',
        describe: 'Name of the connection on which run a query.',
      })
      .option('transaction', {
        alias: 't',
        default: 'default',
        describe: 'Indicates if transaction should be used or not for seeder run. Enabled by default.',
      })
      .option('config', {
        alias: 'f',
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

      await connection.runMigrations(options);
      await connection.close();
      // exit process if no errors
      process.exit(0);
    } catch (err) {
      if (connection) await (connection as Connection).close();

      console.log(chalk.black.bgRed('Error during seeder run:'));
      console.error(err);
      process.exit(1);
    }
  }
}
