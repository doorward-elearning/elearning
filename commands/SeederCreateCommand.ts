import * as yargs from 'yargs';

const chalk = require('chalk');
import { ConnectionOptionsReader } from 'typeorm';
import { CommandUtils } from 'typeorm/commands/CommandUtils';
import { camelCase } from 'typeorm/util/StringUtils';

export default class SeederCreateCommand implements yargs.CommandModule {
  command = 'seeder:create';
  describe = 'Generates a seeder file';

  builder(args: yargs.Argv) {
    return args
      .option('n', {
        alias: 'name',
        describe: 'The name of the seeder file',
        demand: true,
      })
      .option('f', {
        alias: 'config',
        default: 'ormconfig',
        describe: 'Name of the file with connection configuration.',
      });
  }

  async handler(args: yargs.Arguments) {
    try {
      const timestamp = new Date().getTime();
      const fileContent = SeederCreateCommand.getTemplate(args.name as any, timestamp);
      const fileName = timestamp + '-' + args.name + '.ts';
      let directory = args.dir;

      // if directory is not set then try to open tsconfig and find default path there
      if (!directory) {
        try {
          const connectionOptionsReader = new ConnectionOptionsReader({
            root: process.cwd(),
            configName: args.config as any,
          });
          const connectionOptions: any = await connectionOptionsReader.get(args.connection as any);
          directory = connectionOptions.cli ? connectionOptions.cli.seederDir : undefined;
        } catch (err) {
          console.error(err);
        }
      }

      const path = process.cwd() + '/' + (directory ? directory + '/' : '') + fileName;
      await CommandUtils.createFile(path, fileContent);
      console.log(`Seeder ${chalk.blue(path)} has been generated successfully.`);
    } catch (err) {
      console.log(chalk.black.bgRed('Error during seeder creation'));
      console.error(err);
      process.exit(1);
    }
  }

  protected static getTemplate(name: string, timestamp: number): string {
    return `import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';

export class ${camelCase(name, true)}${timestamp} extends SeederInterface {

  async seed(entityManager: EntityManager): Promise<any> {
  }

  async rollback(entityManager: EntityManager): Promise<any> {
  }
}
`;
  }
}
