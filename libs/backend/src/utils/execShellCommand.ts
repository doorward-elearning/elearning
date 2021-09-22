const { spawn } = require('child_process');

const execShellCommand = async (command: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const commandArgs = command.split(/\s+/);
    const result = spawn(commandArgs[0], commandArgs.slice(1));

    result.stdout.on('data', (data) => console.log(data.toString()));

    result.stderr.on('data', (data) => console.error(data.toString()));

    result.on('error', reject);

    result.on('close', resolve);
  });
};

export default execShellCommand;
