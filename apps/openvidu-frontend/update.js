const colors = require('colors/safe');
const fs = require('fs');
const request = require('request');
const AdmZip = require('adm-zip');
const ncp = require('ncp');

const currentOpenviduVersion = require('../../package.json').openviduVersion;

const PACKAGE_DOWNLOAD_FILE = 'tmp/openvidu-call.zip';

const extractContents = () => {
  console.log(colors.cyan('Extracting contents...'));
  const zip = new AdmZip(PACKAGE_DOWNLOAD_FILE);

  zip.extractAllTo('tmp/openvidu-call/', true);
  return require('./tmp/openvidu-call/openvidu-call-master/openvidu-call-front/package.json').version;
};

const downloadPackage = () =>
  new Promise((resolve, reject) => {
    try {
      console.log(colors.cyan('Creating a temporary folder...'));
      if (fs.existsSync('tmp')) {
        fs.rmdirSync('tmp', { recursive: true });
      }
      fs.mkdirSync('tmp');
      console.log(
        colors.cyan('Downloading latest openvidu-call version to: ') + colors.green(__dirname + '/tmp/openvidu-call')
      );

      const directory = fs.createWriteStream(PACKAGE_DOWNLOAD_FILE);
      request({
        url: 'https://github.com/openvidu/openvidu-call/archive/master.zip',
        followAllRedirects: true,
      })
        .pipe(directory)
        .on('error', err => {
          reject(err);
        })
        .on('close', resolve);
    } catch (ex) {
      reject(ex);
    }
  });

const deleteFile = path => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};
const updatePackage = () => {
  return new Promise((resolve, reject) => {
    console.log(colors.cyan('Applying update...'));
    fs.rmdirSync('src/', { recursive: true });
    ncp('tmp/openvidu-call/openvidu-call-master/openvidu-call-front/src', 'src/', err => {
      if (err) {
        reject();
      }
      deleteFile('src/tsconfig.app.json');
      deleteFile('src/tsconfig.spec.json');
      deleteFile('src/tslint.json');
      resolve();
    });
  });
};

const cleanUp = () => {
  // clean up
  console.log('Cleaning up...');
  if (fs.existsSync('tmp')) {
    fs.rmdirSync('tmp', { recursive: true });
  }
};

const update = async () => {
  try {
    console.log(colors.cyan('Updating Openvidu Call'));
    await downloadPackage();
    const version = extractContents();
    await updatePackage();
    cleanUp();

    if (version) {
      console.log(
        colors.green(
          `${'Openvidu Call updated to v' +
            version +
            (currentOpenviduVersion === version ? '' : ' from v' + currentOpenviduVersion)}.`
        )
      );
    }
  } catch (err) {
    console.error(err);
  }
};

update();
