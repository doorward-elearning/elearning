import * as yargs from 'yargs';
import SeederCreateCommand from '../commands/SeederCreateCommand';
import SeederRunCommand from '../commands/SeederRunCommand';
import SeederRevertCommand from '../commands/SeederRevertCommand';

yargs
  .usage('Usage: $0 <command> [options]')
  .command(new SeederCreateCommand())
  .command(new SeederRunCommand())
  .command(new SeederRevertCommand())
  .recommendCommands()
  .demandCommand(1).argv;
