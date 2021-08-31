import * as yargs from 'yargs';
import { Connection, ConnectionOptionsReader, createConnection } from 'typeorm';
import { Type } from '@nestjs/common';
import OrganizationEntity from '../libs/common/src/entities/organization.entity';

const MultiOrgDbOperationCommand = <T, U>(CommandClass: Type<yargs.CommandModule<T, U>>) => {
  class Command implements yargs.CommandModule<T, U> {
    builder = (args: yargs.Argv<T>): yargs.Argv<U> => {
      return (new CommandClass().builder as (args: yargs.Argv<T>) => yargs.Argv<U>)(args).option('orgConfig', {
        alias: 'oc',
        default: 'ormConfig',
        describe: 'Name of the file with the organizations config',
        demand: true,
      });
    };

    async handler(args: yargs.Arguments<U>) {
      let connection: Connection = null;
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
        });
        connection = await createConnection(connectionOptions);

        const organizations = await connection.getRepository(OrganizationEntity).find();
      } catch (error) {
        console.error(error);
        if (connection) await (connection as Connection).close();
      }
    }
  }

  return Command;
};

export default MultiOrgDbOperationCommand;
