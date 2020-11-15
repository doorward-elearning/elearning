const fs = require('fs');
const path = require('path');

let contents = fs.readFileSync('index.html').toString();

const pattern = new RegExp('<!--#include virtual="(.*)" -->', 'ig');

let match;

while ((match = pattern.exec(contents))) {
  const fileName = match[1].replace(/^\//, '');
  if (fs.existsSync(fileName)) {
    const replacement = fs.readFileSync(fileName).toString();

    contents = contents.replace(match[0], replacement);
  }
}

fs.writeFileSync('index.html', contents);
