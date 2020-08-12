import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import modules from './modules';
import members from './members';
import managers from './managers';
import polls from './polls';
import { validateConferenceExists, validateCreateConference, validateUpdateConference } from './validate';
import ConferenceController from './ConferenceController';

const Router = new MRouter('/conferences', Authorization.authenticate);

Router.post('', validateCreateConference, ConferenceController.createConference);

Router.get('', ConferenceController.getConferences);

Router.put('/:conferenceId', validateUpdateConference, ConferenceController.updateConference);

Router.get('/:conferenceId', validateConferenceExists(), ConferenceController.getConference);

Router.delete('/:conferenceId', validateConferenceExists(), ConferenceController.deleteConference);

Router.put('/:conferenceId/modules', ConferenceController.updateConferenceModules);

Router.post('/:conferenceId/room', validateConferenceExists(), ConferenceController.startMeeting);

Router.post('/:conferenceId/room/join', validateConferenceExists(), ConferenceController.joinMeeting);

Router.use('/', modules);

Router.use('/', members);

Router.use('/', managers);

Router.use('/', polls);

export default Router;
