import DatabaseCreatorCommand from './DatabaseCreatorCommand';
import { MigrationGenerateCommand } from 'typeorm/commands/MigrationGenerateCommand';

export class MigrationGenerateCreateDbCommand extends DatabaseCreatorCommand(MigrationGenerateCommand, true) {}
