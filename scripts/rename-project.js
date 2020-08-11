const getAllFiles = require('get-all-files').default;
const fs = require('fs');
const path = require('path');
const child = require('child_process');
const _ = require('lodash');

const ignored = ['.vscode/', 'dist/', 'node_modules/', '.git/', '.idea/', 'patches/'];

const projectDir = path.join(__dirname, '..');

const INITIAL_PROJECT_NAME = 'student';
const NEW_PROJECT_NAME = 'member';

String.prototype.replaceAll = function(search, replacement) {
  return this.toString().replace(new RegExp(search, 'g'), replacement);
};

// Find, Replace, Case
const replaceProjectName = string => {
  return string
    .replaceAll(INITIAL_PROJECT_NAME, NEW_PROJECT_NAME)
    .replaceAll(INITIAL_PROJECT_NAME.toUpperCase(), NEW_PROJECT_NAME.toUpperCase())
    .replaceAll(_.capitalize(INITIAL_PROJECT_NAME), _.capitalize(NEW_PROJECT_NAME))
    .replace(new RegExp(path.sep + '$'), '');
};

const countDirectories = directory => {
  let count = 0;
  for (let i = 0; i < directory.length; i++) {
    if (directory[i] === path.sep) {
      count++;
    }
  }
  return count;
};

const fileList = Array.from(
  getAllFiles.sync
    .array(projectDir, {
      isExcludedDir: dirName => {
        dirName = dirName.replace(projectDir, '').toLowerCase();
        return ignored.find(dir => {
          return dirName.includes(dir);
        });
      },
    })
    .map(file => file.replace(projectDir + '/', ''))
    .reduce((acc, cur) => {
      let directories = cur.split(path.sep);
      directories = directories.slice(0, directories.length - 1);
      directories = directories.map((dir, index) => {
        let result = '';
        for (let i = 0; i <= index; i++) {
          result += directories[i] + path.sep;
        }
        return result;
      });
      return new Set([...acc, ...directories, cur]);
    }, new Set([]))
);

const renameAllFileNames = async () => {
  const files = fileList
    .filter(file => file.toLowerCase().includes(INITIAL_PROJECT_NAME))
    .sort((a, b) => {
      return a.endsWith('/') ? countDirectories(a) - countDirectories(b) : 100;
    });

  const newFiles = {};

  files.forEach(file => {
    const newFileName = replaceProjectName(file);

    console.log(file + ' -> ' + newFileName);
    // rename the file
    try {
      child.execSync('mv "' + file + '" "' + newFileName + '"');
      newFiles[file] = newFileName;
    } catch (e) {}
  });

  files.forEach(file => {
    if (newFiles[file]) {
      child.execSync('git add "' + newFiles[file] + '"');
      child.execSync('git rm -r "' + file + '"');
    }
  });
};
function fileIsAscii(filename) {
  // Read the file with no encoding for raw buffer access.
  const buf = require('fs').readFileSync(filename);
  let isAscii = true;
  for (let i = 0, len = buf.length; i < len; i++) {
    if (buf[i] > 127) {
      isAscii = false;
      break;
    }
  }
  return isAscii;
}

const renameFileContents = async () => {
  const files = fileList
    .filter(file => !file.endsWith('/'))
    .filter(file => !file.test('scripts/rename-project.js'))
    .filter(file => fileIsAscii(file));
  files.forEach(file => {
    const contents = fs.readFileSync(file).toString();
    console.log('Updating file: ' + file);

    fs.writeFileSync(file, replaceProjectName(contents));
  });
};

renameAllFileNames().then(() => {
  renameFileContents();
});
