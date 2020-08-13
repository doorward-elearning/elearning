import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import ElectionsController from './ElectionsController';

const Router = new MRouter('/elections', Authorization.authenticate);

Router.post('/', ElectionsController.createElection);

Router.get('/', ElectionsController.getElections);

Router.get('/:electionId', ElectionsController.getElection);

Router.post('/:electionId/nominees', ElectionsController.addNominee);

Router.get('/:electionId/nominees', ElectionsController.getNominees);

Router.delete('/:electionId/nominees/:nomineeId', ElectionsController.deleteNominee);

export default Router;
