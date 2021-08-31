import MultiOrgDbOperationCommand from './MultiOrgDbOperationCommand';
import { MigrationGenerateCommand } from 'typeorm/commands/MigrationGenerateCommand';

export default class MultiOrgDbMigrateCommand extends MultiOrgDbOperationCommand(MigrationGenerateCommand) {}
