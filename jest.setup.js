const configureLang = require('./libs/common/src/lang/frontend.config');

const dotenv = require('dotenv');

// Use the .test.env file for testing
dotenv.config({ path: './.env' });

configureLang(process.env.REACT_APP_BASE_URL).then();

jest.setTimeout(30000);
