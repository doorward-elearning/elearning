import DatabaseCreatorCommand from './DatabaseCreatorCommand';
import { MigrationRunCommand } from './MigrationRunCommand';

export class MigrationRunCreateDbCommand extends DatabaseCreatorCommand(MigrationRunCommand) {}
