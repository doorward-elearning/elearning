import MultiOrgDbOperationCommand from './MultiOrgDbOperationCommand';
import { MigrationRevertCommand } from '../MigrationRevertCommand';

export class MultiOrgMigrationRevertCommand extends MultiOrgDbOperationCommand(MigrationRevertCommand) {
  command = 'multi-org:migration:revert';
}
