import OpenViduHelper from './OpenViduHelper';
import models from '../database/models';
import Tools from '../utils/Tools';
import { defaultMeetingCapabilities, MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import { CustomerTypes } from '@doorward/common/types/customerTypes';
import Capabilities from '@doorward/common/utils/Capabilities';
import { OPENVIDU_ROLES, OpenviduUser } from '@doorward/common/types/openvidu';

class MeetingRoomsHelper {
  static async joinMeeting(id, req) {
    const meeting = await models.Meeting.findByPk(id, {
      include: [
        {
          model: models.MeetingRoom,
          as: 'meetingRoom',
        },
      ],
    });

    if (!meeting) {
      return null;
    }
    let token;

    const role = !Tools.isMember(req.user) ? OPENVIDU_ROLES.MODERATOR : OPENVIDU_ROLES.PUBLISHER;

    try {
      const details = await OpenViduHelper.getToken(meeting.sessionId, role);
      token = details.token;
    } catch (e) {
      const { id } = await OpenViduHelper.createSession();
      const details = await OpenViduHelper.getToken(id, role);
      token = details.token;
    }

    const capabilities = new Capabilities(MeetingCapabilities, defaultMeetingCapabilities);

    if (process.env.CUSTOMER_TYPE === CustomerTypes.COLLEGE_INDIA) {
      if (role === OPENVIDU_ROLES.MODERATOR) {
        capabilities.add(MeetingCapabilities.TURN_OFF_PARTICIPANTS_VIDEO);
        capabilities.add(MeetingCapabilities.TURN_ON_PARTICIPANTS_VIDEO);
        capabilities.add(MeetingCapabilities.MUTE_PARTICIPANTS);
        capabilities.add(MeetingCapabilities.UNMUTE_PARTICIPANTS);
        capabilities.add(MeetingCapabilities.JOIN_WITH_ACTIVE_VIDEO);
      }
    }

    const userDetails: OpenviduUser = {
      name: 'Participant ' + Math.round(Math.random() * 100),
      avatar: null,
      role,
    };
    if (req.user) {
      userDetails.name = req.user.fullName;
      userDetails.avatar = req.user.profilePicture;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return { meeting, token, user: userDetails, capabilities };
  }

  static async leaveMeetingRoom(meetingRoomId, userId) {
    return models.MeetingRoomMember.destroy({
      where: {
        meetingRoomId,
        participantId: userId,
      },
    });
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
