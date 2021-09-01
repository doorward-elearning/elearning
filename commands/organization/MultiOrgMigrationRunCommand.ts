import MultiOrgDbOperationCommand from './MultiOrgDbOperationCommand';
import { MigrationRunCreateDbCommand } from '../MigrationRunCreateDbCommand';

export default class MultiOrgMigrationRunCommand extends MultiOrgDbOperationCommand(MigrationRunCreateDbCommand) {
  command = 'multi-org:migration:run';
}
