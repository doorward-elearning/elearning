import * as yargs from 'yargs';
import { Connection, ConnectionOptionsReader, createConnection } from 'typeorm';
import { Type } from '@nestjs/common';
import OrganizationEntity from '../../libs/common/src/entities/organization.entity';
import chalk from 'chalk';
import organizationsEntities from '../../libs/backend/src/database/organizations.entities';
import { ORGANIZATIONS_CONNECTION_NAME } from '../../libs/backend/src/utils/createOrganizationsDbConnection';

const MultiOrgDbOperationCommand = <T, U>(CommandClass: Type<yargs.CommandModule<T, U>>) => {
  const commandInstance = new CommandClass();

  class Command implements yargs.CommandModule<T, U> {
    command = commandInstance.command;

    describe = commandInstance.describe;

    aliases = commandInstance.aliases;

    builder = (args: yargs.Argv<T>) => {
      return (commandInstance.builder as (args: yargs.Argv<T>) => yargs.Argv<U>)(args).option('x', {
        alias: 'organization',
        default: 'none',
        describe: 'The name of the organization to run the command in',
        demand: false,
      });
    };

    public getArguments(args: yargs.Arguments<U>): yargs.Arguments<U> {
      return args;
    }

    public handler = async (args: yargs.Arguments<U>) => {
      args = this.getArguments(args);
      let connection: Connection = null;
      try {
        const connectionOptionsReader = new ConnectionOptionsReader({
          root: process.cwd(),
          configName: args.config as any,
        });
        const connectionOptions: any = await connectionOptionsReader.get(args.connection as any);

        connection = await createConnection({
          ...connectionOptions,
          database: process.env.ORGANIZATION_DATABASE,
          migrationsRun: false,
          name: ORGANIZATIONS_CONNECTION_NAME,
          entities: organizationsEntities,
        });

        let organizations;
        if (args.organization && args.organization !== 'none') {
          organizations = await connection.getRepository(OrganizationEntity).find({
            where: {
              id: args.organization === 'root' ? process.env.DEFAULT_ORGANIZATION_ID : args.organization,
            },
          });
        } else {
          organizations = await connection.getRepository(OrganizationEntity).find();
        }

        await Promise.all(
          organizations.map(async (organization) => {
            console.log(
              `Running ${chalk.cyan(this.command + '')} for organization [${organization.id} - ${organization.name}]`
            );
            const orgConnectionOptions = {
              ...connectionOptions,
              database: organization.databaseName,
              logging: true,
              name: organization.id,
            };

            await new CommandClass().handler({
              ...args,
              connection: organization.id,
              connectionOptions: orgConnectionOptions,
            });

            console.log(`${chalk.cyan('Done')} - [${organization.id} - ${organization.name}]`);
          })
        );

        process.exit(0);
      } catch (error) {
        console.log(chalk.black.bgRed(`Error during run for command ${this.command}:`));
        console.error(error);
        if (connection) await (connection as Connection).close();
      }
    };
  }

  return Command;
};

export default MultiOrgDbOperationCommand;
