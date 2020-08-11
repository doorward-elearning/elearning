import models from '../database/models';
import OpenViduHelper from './OpenViduHelper';
import MeetingRoomsHelper from './MeetingRoomsHelper';
import { ForumModuleStatistics } from '@doorward/common/types/api';
import { MyForumsInclude } from '../utils/includes';
import Tools from '../utils/Tools';

class ForumHelper {
  static async getForum(forumId) {
    return await models.Forum.findOne({
      where: { id: forumId },
      include: MyForumsInclude(),
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

  static forumItemStats(forum): ForumModuleStatistics {
    return forum.modules.reduce(
      (acc, module) => {
        const stats = ForumHelper.moduleItemStats(module);
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

  static moduleItemStats(module): ForumModuleStatistics {
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

  static async joinForumMeetingRoom(meetingRoom, participant) {
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
    return [404, undefined, 'No meeting has been started for this forum.'];
  }

  static async createMeetingRoom(forumId, hostId) {
    const forum = await models.Forum.findByPk(forumId, {
      include: [
        {
          model: models.MeetingRoom,
          as: 'meetingRoom',
          required: false,
        },
      ],
    });
    if (!forum.meetingRoom) {
      const meetingRoom = await models.MeetingRoom.create({
        title: `[Room] ${forum.title}`,
      });
      await forum.update({
        meetingRoomId: meetingRoom.id,
      });
    }
    await forum.reload();
    await ForumHelper.addMembersToForumMeetingRoom(forum.id);
    await MeetingRoomsHelper.joinMeetingRoom(forum.meetingRoomId, hostId, 'MODERATOR');
    return forum;
  }

  static async addMembersToForumMeetingRoom(forumId) {
    const forum = await models.Forum.findByPk(forumId, {
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
      (forum.members || []).map(async member => {
        return MeetingRoomsHelper.joinMeetingRoom(forum.meetingRoomId, member.id);
      })
    );
  }

  static async getMembersForForum(forumId) {
    return models.User.findAll({
      include: [
        {
          model: models.Forum,
          where: {
            id: forumId,
          },
          as: 'forums',
          attributes: [],
        },
      ],
    });
  }
}

export default ForumHelper;
