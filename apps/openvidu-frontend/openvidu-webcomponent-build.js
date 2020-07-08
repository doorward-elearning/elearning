const fs = require('fs-extra');
const concat = require('concat');
const VERSION = require('../../package.json').openviduVersion;

const appModule = './src/app/app.module.ts';
const buildDir = '../../dist/apps/openvidu-frontend/';
const outputDir = '../../dist/openvidu-webcomponent/';

const outputFileName = 'openvidu-webcomponent-' + VERSION;

const jsCopyDirs = ['../../apps/doorward-frontend/src/assets/js/openvidu-webcomponent.js'];
const cssCopyDirs = ['../../apps/doorward-frontend/src/assets/css/openvidu-webcomponent.css'];

async function buildElement() {
  const files = ['runtime-es5.js', 'polyfills-es5.js', 'main-es5.js'].map(file => `${buildDir}${file}`);

  try {
    await fs.ensureDir(outputDir);
    await concat(files, outputDir + outputFileName + '.js');
    await fs.copy(buildDir + 'styles.css', outputDir + outputFileName + '.css');
  } catch (err) {
    console.error('Error executing build function in webcomponent-builds.js');
    throw err;
  }
}

async function copyCssFile(destinations) {
  return Promise.all(
    destinations.map(async destination => {
      const cssFile = outputDir + outputFileName + '.css';
      if (fs.existsSync(cssFile)) {
        try {
          console.log('Copying openvidu-webcomponent css file from: ' + cssFile + ' to: ' + destination);
          await fs.copy(cssFile, destination);
        } catch (err) {
          console.error('Error executing css copy function in webcomponent-builds.js');
          throw err;
        }
      }
    })
  );
}

async function copyJsFile(destinations) {
  return Promise.all(
    destinations.map(async destination => {
      const jsFile = outputDir + outputFileName + '.js';
      if (fs.existsSync(jsFile)) {
        try {
          console.log('Copying openvidu-webcomponent js file from: ' + jsFile + ' to: ' + destination);
          await fs.copy(jsFile, destination);
        } catch (err) {
          console.error('Error executing js copy function in webcomponent-builds.js');
          throw err;
        }
      }
    })
  );
}

function replaceText(file, originalText, changedText) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(originalText, changedText);

    fs.writeFile(file, result, 'utf8', err => {
      if (err) return console.log(err);
    });
  });
}

async function restore() {
  const appModule = './src/app/app.module.ts';
  replaceText(appModule, '// bootstrap: [AppComponent]', 'bootstrap: [AppComponent]');
}

// Fixed app-route bug: https://github.com/angular/angular/issues/24674
module.exports.prepareWebcomponent = function() {
  console.log('Preparing webcomponent files ...');
  replaceText(appModule, 'bootstrap: [AppComponent]', '// bootstrap: [AppComponent]');
};

module.exports.buildWebcomponent = async () => {
  console.log('Building OpenVidu Web Component (' + VERSION + ')');

  try {
    await buildElement();
    await copyCssFile(cssCopyDirs);
    await copyJsFile(jsCopyDirs);
    await restore();
    console.log('OpenVidu Web Component (' + VERSION + ') built');
  } catch (error) {
    replaceText(appModule, '// bootstrap: [AppComponent]', 'bootstrap: [AppComponent]');
    console.error(error);
  }
};
