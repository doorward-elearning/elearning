import { Op } from 'sequelize';
import models from '../../../database/models';
import MemberController from '../../users/members/MemberController';
import UserController from '../../users/UserController';
import * as roles from '../../../utils/roles';
import MeetingRoomsHelper from '../../../helpers/MeetingRoomsHelper';
import { searchQuery } from '../../../utils/query';

class MemberForumController {
  static async getMembers(req) {
    const { params } = req;
    const members = await MemberForumController.getMembersByForum(params.forumId);

    return [200, { members }];
  }

  /**
   * Get the list of members that are not registered to a particular forum
   * @param req
   * @returns {Promise<*[]>}
   */
  static async getMembersNotRegistered(req) {
    const { params } = req;
    const query = searchQuery(req, ['firstName', 'lastName', 'email', 'username']);
    const registered = await models.sequelize.query('SELECT "memberId" from "MemberForums" WHERE "forumId" = ?', {
      replacements: [params.forumId],
    });
    const ids = registered[0].map(member => member.memberId);
    const members = await UserController.findByRole(roles.MEMBER, {
      where: {
        id: {
          [Op.notIn]: ids,
        },
        ...query,
      },
    });
    return [200, { members }];
  }

  static async getMembersByForum(forumId) {
    return models.User.findAll({
      include: [
        {
          model: models.Forum,
          as: 'forums',
          where: {
            id: forumId,
          },
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  static async createMember(req) {
    const { params } = req;
    const result = await MemberController.createMember(req);
    if (result) {
      const { member } = result[1];
      const forum = await models.Forum.findByPk(params.forumId);

      // add the member to this forum
      await models.MemberForum.create({
        memberId: member.id,
        forumId: params.forumId,
      });
      await MeetingRoomsHelper.joinMeetingRoom(forum.meetingRoomId, member.id);

      return [201, { member }, `${member.username} has been added to the forum`];
    }
  }

  static async unEnrollMember(req) {
    const {
      params: { forumId, memberId },
    } = req;
    const forum = await models.Forum.findByPk(forumId);

    await models.MemberForum.destroy({
      where: {
        memberId,
        forumId,
      },
    });

    await MeetingRoomsHelper.leaveMeetingRoom(forum.meetingRoomId, memberId);

    return [200, undefined, 'Member has been enrolled from the forum.'];
  }

  static async addMember(req) {
    const {
      params: { forumId },
      body: { members },
    } = req;
    const forum = await models.Forum.findByPk(forumId);

    const memberList = await models.User.findAll({
      where: {
        id: members,
      },
    });

    await Promise.all(
      memberList.map(async member => {
        await models.MemberForum.findOrCreate({
          defaults: {
            memberId: member.id,
            forumId,
          },
          where: {
            memberId: member.id,
            forumId,
          },
        });
        await MeetingRoomsHelper.joinMeetingRoom(forum.meetingRoomId, member.id);
      })
    );
    return [200, { members: memberList }, 'Members have been added to the forum'];
  }
}

export default MemberForumController;
