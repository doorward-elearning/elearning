import * as yargs from 'yargs';
import { Type } from '@nestjs/common';
import { ConnectionOptionsReader } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

const DatabaseCreatorCommand = <T, U>(CommandClass: Type<yargs.CommandModule<T, U>>, exitOnFinish = false) => {
  const commandInstance = new CommandClass();

  class Command implements yargs.CommandModule {
    command = commandInstance.command;

    aliases = commandInstance.aliases;

    builder = commandInstance.builder;

    describe = commandInstance.describe;

    async handler(args: yargs.Arguments<U>) {
      try {
        const connectionOptionsReader = new ConnectionOptionsReader({
          root: process.cwd(),
          configName: args.config as any,
        });
        const connectionOptions: any =
          args.connectionOptions || (await connectionOptionsReader.get(args.connection as any));

        await createDatabase({ ifNotExist: true, charset: 'utf8' }, connectionOptions);

        await commandInstance.handler(args);

        // Check if the command was run directly, or is a composition of another command
        if (exitOnFinish) {
          process.exit(0);
        }
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    }
  }

  return Command;
};

export default DatabaseCreatorCommand;
