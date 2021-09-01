import * as yargs from 'yargs';
import SeederCreateCommand from '../commands/SeederCreateCommand';
import SeederRunCommand from '../commands/SeederRunCommand';
import SeederRevertCommand from '../commands/SeederRevertCommand';
import MultiOrgMigrationRunCommand from '../commands/organization/MultiOrgMigrationRunCommand';
import { MigrationGenerateCreateDbCommand } from '../commands/MigrationGenerateCreateDbCommand';
import { MigrationRunCreateDbCommand } from '../commands/MigrationRunCreateDbCommand';
import { MultiOrgMigrationRevertCommand } from '../commands/organization/MultiOrgMigrationRevertCommand';
import { MultiOrgMigrationGenerateCommand } from '../commands/organization/MultiOrgMigrationGenerateCommand';
import MultiOrgSchemaDropCommand from '../commands/organization/MultiOrgSchemaDropCommand';
import { MultiOrgSeederRunCommand } from '../commands/organization/MultiOrgSeederRunCommand';
import { MultiOrgSeederRevertCommand } from '../commands/organization/MultiOrgSeederRevertCommand';

yargs
  .usage('Usage: $0 <command> [options]')
  // Seeder commands
  .command(new SeederCreateCommand())
  .command(new SeederRunCommand())
  .command(new SeederRevertCommand())

  // Multi Organization commands
  .command(new MultiOrgMigrationRunCommand())
  .command(new MultiOrgMigrationRevertCommand())
  .command(new MultiOrgMigrationGenerateCommand())
  .command(new MultiOrgSchemaDropCommand())
  .command(new MultiOrgSeederRunCommand())
  .command(new MultiOrgSeederRevertCommand())

  // Creates database
  .command(new MigrationGenerateCreateDbCommand())
  .command(new MigrationRunCreateDbCommand())

  .recommendCommands()
  .demandCommand(1).argv;
