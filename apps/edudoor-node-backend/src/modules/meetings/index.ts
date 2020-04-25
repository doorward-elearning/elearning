import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import BaseValidator from '../../middleware/BaseValidator';
import models from '../../database/models';
import MeetingsController from './MeetingsController';

const Router = new MRouter('/meetings');

Router.get(
  '/:id',
  BaseValidator.modelExists(
    req => ({ id: req.params.id, status: 'STARTED' }),
    models.Meeting,
    'This meeting does not exist, or has already ended.'
  ),
  MeetingsController.joinMeeting
);


Router.exclude(Authorization.authenticate).post('/webhook', MeetingsController.processWebhook);

export default Router;
