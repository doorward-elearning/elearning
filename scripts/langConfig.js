const fs = require('fs');
const path = require('path');

const languages = fs.readdirSync('../lang');

languages.forEach((lang) => {
  console.log(lang);
});
