import MultiOrgDbOperationCommand from './MultiOrgDbOperationCommand';
import SeederRunCommand from '../SeederRunCommand';

export class MultiOrgSeederRunCommand extends MultiOrgDbOperationCommand(SeederRunCommand) {
  command = 'multi-org:seeder:run';
}
