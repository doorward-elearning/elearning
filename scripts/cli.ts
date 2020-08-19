import * as yargs from 'yargs';
import SeederCreateCommand from '../commands/SeederCreateCommand';
import SeederRunCommand from '../commands/SeederRunCommand';

yargs
  .usage('Usage: $0 <command> [options]')
  .command(new SeederCreateCommand())
  .command(new SeederRunCommand())
  .recommendCommands()
  .demandCommand(1).argv;
