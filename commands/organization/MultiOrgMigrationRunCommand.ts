import MultiOrgDbOperationCommand from './MultiOrgDbOperationCommand';
import DatabaseCreatorCommand from '../DatabaseCreatorCommand';
import { MigrationRunCommand } from '../MigrationRunCommand';

export default class MultiOrgMigrationRunCommand extends MultiOrgDbOperationCommand(
  DatabaseCreatorCommand(MigrationRunCommand, false)
) {
  command = 'multi-org:migration:run';
}
