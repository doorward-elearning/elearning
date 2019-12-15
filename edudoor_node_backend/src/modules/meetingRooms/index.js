import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import BaseValidator from '../../middleware/BaseValidator';
import models from '../../database/models';
import MeetingRoomsController from './MeetingRoomsController';

const Router = new MRouter('/meetingRooms', Authorization.authenticate);

Router.get(
  '/:id',
  BaseValidator.modelExists(
    req => ({ id: req.params.id, status: 'STARTED' }),
    models.MeetingRoom,
    'The meeting room has not been initialized.'
  ),
  MeetingRoomsController.joinMeeting
);

Router.exclude(Authorization.authenticate).post('/webhook', MeetingRoomsController.processWebhook);

export default Router;
