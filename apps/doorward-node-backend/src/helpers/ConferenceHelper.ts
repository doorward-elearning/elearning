import models from '../database/models';
import OpenViduHelper from './OpenViduHelper';
import MeetingRoomsHelper from './MeetingRoomsHelper';
import { ConferenceModuleStatistics } from '@doorward/common/types/api';
import { MyConferencesInclude } from '../utils/includes';
import Tools from '../utils/Tools';

class ConferenceHelper {
  static async getConference(conferenceId) {
    return await models.Conference.findOne({
      where: { id: conferenceId },
      include: MyConferencesInclude(),
      order: [
        [
          {
            model: models.Module,
            as: 'modules',
          },
          'order',
          'asc',
        ],
        [{ model: models.Module, as: 'modules' }, { model: models.ModuleItem, as: 'items' }, 'order', 'asc'],
      ],
    });
  }

  static conferenceItemStats(conference): ConferenceModuleStatistics {
    return conference.modules.reduce(
      (acc, module) => {
        const stats = ConferenceHelper.moduleItemStats(module);
        return {
          assignments: acc.assignments + stats.assignments,
          quizzes: acc.quizzes + stats.quizzes,
          pages: acc.pages + stats.pages,
        };
      },
      {
        assignments: 0,
        quizzes: 0,
        pages: 0,
      }
    );
  }

  static moduleItemStats(module): ConferenceModuleStatistics {
    return module.items.reduce(
      (acc, item) => {
        return {
          assignments: acc.assignments + (item.type === 'Assignment') ? 1 : 0,
          quizzes: acc.quizzes + (item.type === 'Quiz') ? 1 : 0,
          pages: acc.pages + (item.type === 'Page') ? 1 : 0,
        };
      },
      { assignments: 0, quizzes: 0, pages: 0 }
    );
  }

  static async joinConferenceMeetingRoom(meetingRoom, participant) {
    const participantId = participant.id;
    const meeting = await models.Meeting.findOne({
      where: {
        meetingRoomId: meetingRoom.id,
        status: 'STARTED',
      },
    });

    if (meeting) {
      const meetingInstance = await models.MeetingRoomMember.findOne({
        where: {
          meetingRoomId: meetingRoom.id,
          participantId,
        },
      });
      if (!meetingInstance) {
        return [403, undefined, 'You are not authorized to join this meeting'];
      }
      let token;

      try {
        const result = await OpenViduHelper.getToken(meeting.sessionId, meetingInstance.role);
        token = result.token;
      } catch (err) {
        if (!Tools.isMember(participant)) {
          const { id } = await OpenViduHelper.createSession();
          const result = await OpenViduHelper.getToken(id, meetingInstance.role);
          token = result.token;
        } else {
          console.log(err);
        }
      }

      if (token) {
        return [
          200,
          {
            id: meeting.id,
            sessionId: meeting.sessionId,
            sessionName: meetingRoom.title,
            token,
          },
          'Joining the meeting.',
        ];
      }
    }
    return [404, undefined, 'No meeting has been started for this conference.'];
  }

  static async createMeetingRoom(conferenceId, hostId) {
    const conference = await models.Conference.findByPk(conferenceId, {
      include: [
        {
          model: models.MeetingRoom,
          as: 'meetingRoom',
          required: false,
        },
      ],
    });
    if (!conference.meetingRoom) {
      const meetingRoom = await models.MeetingRoom.create({
        title: `[Room] ${conference.title}`,
      });
      await conference.update({
        meetingRoomId: meetingRoom.id,
      });
    }
    await conference.reload();
    await ConferenceHelper.addMembersToConferenceMeetingRoom(conference.id);
    await MeetingRoomsHelper.joinMeetingRoom(conference.meetingRoomId, hostId, 'MODERATOR');
    return conference;
  }

  static async addMembersToConferenceMeetingRoom(conferenceId) {
    const conference = await models.Conference.findByPk(conferenceId, {
      include: [
        {
          model: models.MeetingRoom,
          as: 'meetingRoom',
          required: false,
        },
        {
          model: models.User,
          as: 'members',
          required: false,
        },
      ],
    });

    return Promise.all(
      (conference.members || []).map(async member => {
        return MeetingRoomsHelper.joinMeetingRoom(conference.meetingRoomId, member.id);
      })
    );
  }

  static async getMembersForConference(conferenceId) {
    return models.User.findAll({
      include: [
        {
          model: models.Conference,
          where: {
            id: conferenceId,
          },
          as: 'conferences',
          attributes: [],
        },
      ],
    });
  }
}

export default ConferenceHelper;
