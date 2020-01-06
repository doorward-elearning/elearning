import OpenViduHelper from './OpenViduHelper';

class MeetingRoomsHelper {
  static async joinMeeting(id, req, role = 'PUBLISHER') {
    const meetingRoom = await models.Meeting.findByPk(id);

    const { token } = await OpenViduHelper.getToken(meetingRoom.sessionId, role);

    const user = req.user.fullName;

    return { ...meetingRoom.dataValues, token, user };
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

  static async createMeeting(meetingRoomId, hostId) {
    const { id: sessionId } = await OpenViduHelper.createSession();
    return models.Meeting.create({
      meetingRoomId,
      sessionId,
      hostId,
    });
  }
}

export default MeetingRoomsHelper;
