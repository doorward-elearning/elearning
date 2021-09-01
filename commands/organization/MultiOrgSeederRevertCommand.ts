import MultiOrgDbOperationCommand from './MultiOrgDbOperationCommand';
import SeederRevertCommand from '../SeederRevertCommand';

export class MultiOrgSeederRevertCommand extends MultiOrgDbOperationCommand(SeederRevertCommand) {
  command = 'multi-org:seeder:revert';
}
