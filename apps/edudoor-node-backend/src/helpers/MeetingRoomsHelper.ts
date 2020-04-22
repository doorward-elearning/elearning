import OpenViduHelper from './OpenViduHelper';
import models from '../database/models';

class MeetingRoomsHelper {
  static async joinMeeting(id, req, role = 'PUBLISHER') {
    const meeting = await models.Meeting.findByPk(id, {
      include: [
        {
          model: models.MeetingRoom,
          as: 'meetingRoom',
        },
      ],
    });

    const { token } = await OpenViduHelper.getToken(meeting.sessionId, role);

    const user = req.user.fullName;

    return { ...meeting.dataValues, token, user };
  }

  static async joinMeetingRoom(meetingRoomId, userId, role = 'PUBLISHER') {
    return models.MeetingRoomMember.findOrCreate({
      defaults: {
        meetingRoomId,
        participantId: userId,
        role,
      },
      where: {
        meetingRoomId,
        participantId: userId,
      },
    });
  }

  static async createMeeting(meetingRoomId, hostId = null) {
    const { id: sessionId } = await OpenViduHelper.createSession();
    return models.Meeting.create({
      meetingRoomId,
      sessionId,
      hostId,
    });
  }
}

export default MeetingRoomsHelper;
