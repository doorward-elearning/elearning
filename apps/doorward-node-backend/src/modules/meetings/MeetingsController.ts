import MeetingRoomsHelper from '../../helpers/MeetingRoomsHelper';
import atob from 'atob';
import models from '../../database/models';

class MeetingsController {
  static async joinMeeting(req) {
    const meeting = await MeetingRoomsHelper.joinMeeting(req.params.id, req);
    if (!meeting) {
      return [404, undefined, 'Meeting does not exist'];
    }

    return [200, { ...meeting }];
  }

  static async authenticateWebhook(req) {
    const authorization = req.headers.Authorization;
    if (authorization) {
      const tokens = authorization.split(' ');
      if (tokens.length === 2) {
        if (tokens[0].toLowerCase() === 'basic') {
          if (atob(tokens[1]) === process.env.OPENVIDU_PASSWORD) {
            return null;
          }
        }
      }
    }
    return [403, undefined, 'Invalid openvidu webhook credentials'];
  }

  static async processWebhook(req) {
    const {
      body: { event, sessionId },
    } = req;

    const meeting = await models.Meeting.findOne({
      where: {
        sessionId,
      },
    });
    if (meeting) {
      switch (event) {
        case 'sessionDestroyed':
          meeting.update({ status: 'ENDED' });
          break;
        default:
          break;
      }
    }
    return [200];
  }
}

export default MeetingsController;
