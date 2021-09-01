import MultiOrgDbOperationCommand from './MultiOrgDbOperationCommand';
import { MigrationGenerateCommand } from '../MigrationGenerateCommand';
import * as yargs from 'yargs';

export class MultiOrgMigrationGenerateCommand extends MultiOrgDbOperationCommand(MigrationGenerateCommand) {
  command = 'multi-org:migration:generate';

  getArguments(args: yargs.Arguments<any>): yargs.Arguments<any> {
    return {
      ...args,
      organization: args.organization || 'root',
    };
  }
}
