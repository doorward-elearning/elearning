import MeetingRoomsHelper from '../../helpers/MeetingRoomsHelper';
import atob from 'atob';

class MeetingRoomsController {
  static async joinMeeting(req) {
    const meetingRoom = await MeetingRoomsHelper.joinMeeting(req.params.id, req);

    return [200, { meetingRoom }];
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

    const meetingRoom = await models.MeetingRoom.findOne({
      where: {
        sessionId,
      },
    });
    if (meetingRoom) {
      switch (event) {
        case 'sessionDestroyed':
          meetingRoom.update({ status: 'ENDED' });
          break;
        default:
          break;
      }
    }
    return [200];
  }
}

export default MeetingRoomsController;
