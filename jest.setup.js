import configureLang from './libs/common/src/lang/frontend.config';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const dotenv = require('dotenv');

// Use the .test.env file for testing
dotenv.config({ path: './.env' });

configureLang(process.env.REACT_APP_BASE_URL).then().catch();

Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(30000);
