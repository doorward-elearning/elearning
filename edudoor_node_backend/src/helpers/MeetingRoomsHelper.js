import OpenViduHelper from './OpenViduHelper';

class MeetingRoomsHelper {
  static async joinMeeting(id, req, role = 'PUBLISHER') {
    const meetingRoom = await models.MeetingRoom.findByPk(id);

    const { token } = await OpenViduHelper.getToken(meetingRoom.sessionId, role);

    const user = req.user.fullName;

    return { ...meetingRoom.dataValues, token, user };
  }
}

export default MeetingRoomsHelper;
