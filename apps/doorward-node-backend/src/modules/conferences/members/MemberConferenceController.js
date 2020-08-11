import { Op } from 'sequelize';
import models from '../../../database/models';
import MemberController from '../../users/members/MemberController';
import UserController from '../../users/UserController';
import * as roles from '../../../utils/roles';
import MeetingRoomsHelper from '../../../helpers/MeetingRoomsHelper';
import { searchQuery } from '../../../utils/query';

class MemberConferenceController {
  static async getMembers(req) {
    const { params } = req;
    const members = await MemberConferenceController.getMembersByConference(params.conferenceId);

    return [200, { members }];
  }

  /**
   * Get the list of members that are not registered to a particular conference
   * @param req
   * @returns {Promise<*[]>}
   */
  static async getMembersNotRegistered(req) {
    const { params } = req;
    const query = searchQuery(req, ['firstName', 'lastName', 'email', 'username']);
    const registered = await models.sequelize.query('SELECT "memberId" from "MemberConferences" WHERE "conferenceId" = ?', {
      replacements: [params.conferenceId],
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

  static async getMembersByConference(conferenceId) {
    return models.User.findAll({
      include: [
        {
          model: models.Conference,
          as: 'conferences',
          where: {
            id: conferenceId,
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
      const conference = await models.Conference.findByPk(params.conferenceId);

      // add the member to this conference
      await models.MemberConference.create({
        memberId: member.id,
        conferenceId: params.conferenceId,
      });
      await MeetingRoomsHelper.joinMeetingRoom(conference.meetingRoomId, member.id);

      return [201, { member }, `${member.username} has been added to the conference`];
    }
  }

  static async unEnrollMember(req) {
    const {
      params: { conferenceId, memberId },
    } = req;
    const conference = await models.Conference.findByPk(conferenceId);

    await models.MemberConference.destroy({
      where: {
        memberId,
        conferenceId,
      },
    });

    await MeetingRoomsHelper.leaveMeetingRoom(conference.meetingRoomId, memberId);

    return [200, undefined, 'Member has been enrolled from the conference.'];
  }

  static async addMember(req) {
    const {
      params: { conferenceId },
      body: { members },
    } = req;
    const conference = await models.Conference.findByPk(conferenceId);

    const memberList = await models.User.findAll({
      where: {
        id: members,
      },
    });

    await Promise.all(
      memberList.map(async member => {
        await models.MemberConference.findOrCreate({
          defaults: {
            memberId: member.id,
            conferenceId,
          },
          where: {
            memberId: member.id,
            conferenceId,
          },
        });
        await MeetingRoomsHelper.joinMeetingRoom(conference.meetingRoomId, member.id);
      })
    );
    return [200, { members: memberList }, 'Members have been added to the conference'];
  }
}

export default MemberConferenceController;
