import Sequelize from 'sequelize';
import models from '../../database/models';
import { ForumInclude, MemberForumsInclude } from '../../utils/includes';
import ModulesController from './modules/ModulesController';
import ModulesHelper from '../../helpers/ModulesHelper';
import ForumHelper from '../../helpers/ForumHelper';
import Tools from '../../utils/Tools';
import MeetingRoomsHelper from '../../helpers/MeetingRoomsHelper';
import Socket from '../../websocket/Socket';
import { LIVE_CLASSROOM_STARTED } from '../../websocket/types';
import OpenViduHelper from '../../helpers/OpenViduHelper';

class ForumController {
  static async createForum(req) {
    const {
      body: { modules, ...other },
      user: { id: userId },
    } = req;

    const forum = await models.Forum.create(
      { ...other, createdBy: userId },
      {
        include: ForumInclude,
      }
    );

    await Promise.all(
      modules.map(async module => {
        return ModulesController.createModule(forum.id, module);
      })
    );

    await forum.reload();

    return [201, { forum }, 'Forum created successfully'];
  }

  static async updateForumModules(req) {
    const { body, params } = req;
    const { modules } = body;

    await Promise.all(modules.map(ModulesHelper.updateModule));

    const { modules: updatedModules } = await ForumHelper.getForum(params.forumId);

    return [200, { modules: updatedModules }, 'Modules have been updated.'];
  }

  static async updateForum(req) {
    const {
      body: { ...other },
      params: { forumId },
    } = req;

    const forum = (
      await models.Forum.update(
        { ...other },
        {
          where: { id: forumId },
          include: ForumInclude,
          returning: true,
        }
      )
    )[1][0];
    await forum.reload();

    return [200, { forum }, 'Forum has been updated.'];
  }

  static async getForums(req) {
    const { user } = req;

    let forums;
    if (Tools.isMember(user)) {
      // eslint-disable-next-line prefer-destructuring
      forums = (
        await models.User.findByPk(user.id, {
          include: MemberForumsInclude(),
        })
      ).forums;
    } else {
      const managed = await models.Forum.findAll({
        include: [
          {
            model: models.User,
            as: 'managers',
            where: {
              id: user.id,
            },
          },
        ],
      });
      forums = await models.Forum.findAll({
        includeIgnoreAttributes: false,
        include: [
          {
            model: models.User,
            as: 'members',
            attributes: [],
            required: false,
            subQuery: true,
          },
          {
            model: models.User,
            as: 'author',
            where: Tools.isAdmin(user) ? {} : { id: user.id },
            attributes: [],
            required: !managed.length,
          },
          {
            model: models.User,
            as: 'managers',
            where: {
              id: user.id,
            },
            required: managed.length,
          },
          {
            model: models.MeetingRoom,
            as: 'meetingRoom',
            required: false,
            include: [
              {
                model: models.Meeting,
                as: 'currentMeeting',
                where: {
                  status: 'STARTED',
                },
              },
            ],
          },
        ],
        attributes: {
          include: [[Sequelize.fn('COUNT', Sequelize.col('members.id')), 'numMembers']],
        },
        group: ['Forum.id'],
        order: [['createdAt', 'desc']],
      });
    }

    forums = await Promise.all(
      forums.map(async forum => {
        if (forum.meetingRoomId) {
          forum.dataValues.meetingRoom = await models.MeetingRoom.findByPk(forum.meetingRoomId, {
            include: [
              {
                model: models.Meeting,
                as: 'currentMeeting',
                where: {
                  status: 'STARTED',
                },
              },
            ],
          });
        }
        return forum;
      })
    );

    return [200, { forums }];
  }

  static async getForum(req) {
    const {
      params: { forumId },
    } = req;
    const forum = await ForumHelper.getForum(forumId);

    forum.dataValues.itemCount = ForumHelper.forumItemStats(forum);
    // check meeting
    const meeting = forum.meetingRoom?.currentMeeting;
    if (meeting) {
      if (meeting.status === 'STARTED') {
        try {
          await OpenViduHelper.getToken(meeting.sessionId);
        } catch (e) {
          forum.meetingRoom.currentMeeting = null;
          await models.Meeting.update(
            { status: 'ENDED' },
            {
              where: {
                id: meeting.id,
              },
            }
          );
        }
      }
    }

    return [200, { forum }];
  }

  static async startMeeting(req) {
    const { params, user } = req;

    const forum = await ForumHelper.createMeetingRoom(params.forumId, user.id);

    const { meetingRoom } = forum;

    if (!(await models.Meeting.findOne({ where: { meetingRoomId: meetingRoom.id, status: 'STARTED' } }))) {
      await MeetingRoomsHelper.createMeeting(meetingRoom.id, user.id);
    }

    const members = await ForumHelper.getMembersForForum(forum.id);

    Socket.send(members, LIVE_CLASSROOM_STARTED, {
      forumId: forum.id,
    });

    return ForumHelper.joinForumMeetingRoom(meetingRoom, user);
  }

  static async joinMeeting(req) {
    const { params, user } = req;
    const forum = await models.Forum.findByPk(params.forumId);

    const meetingRoom = await models.Meeting.findOne({
      where: {
        forumId: forum.id,
        status: 'STARTED',
      },
    });
    return ForumHelper.joinMeeting(forum, meetingRoom, user);
  }

  static async deleteForum(req) {
    const {
      params: { forumId },
    } = req;

    await models.Forum.destroy({ where: { id: forumId } });

    return [200, undefined, 'Forum has been deleted.'];
  }
}

export default ForumController;
