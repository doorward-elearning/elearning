import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import ElectionsController from './ElectionsController';

const Router = new MRouter('/elections', Authorization.authenticate);

Router.post('/', ElectionsController.createElection);

Router.get('/', ElectionsController.getElections);

Router.get('/:electionId', ElectionsController.getElection);

export default Router;
