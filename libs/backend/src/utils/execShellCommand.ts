const util = require('util');
const exec = util.promisify(require('child_process').exec);

const execShellCommand = async (command: string): Promise<any> => {
  const { stdout, stderr } = await exec(command);

  console.log(stdout);
  console.error(stderr);
};

export default execShellCommand;
