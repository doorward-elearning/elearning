import { Op } from 'sequelize';
import models from '../../../database/models';
import MemberController from '../../users/members/MemberController';
import UserController from '../../users/UserController';
import * as roles from '../../../utils/roles';
import MeetingRoomsHelper from '../../../helpers/MeetingRoomsHelper';
import { searchQuery } from '../../../utils/query';

class MemberCourseController {
  static async getMembers(req) {
    const { params } = req;
    const members = await MemberCourseController.getMembersByCourse(params.courseId);

    return [200, { members }];
  }

  /**
   * Get the list of members that are not registered to a particular course
   * @param req
   * @returns {Promise<*[]>}
   */
  static async getMembersNotRegistered(req) {
    const { params } = req;
    const query = searchQuery(req, ['firstName', 'lastName', 'email', 'username']);
    const registered = await models.sequelize.query('SELECT "memberId" from "MemberCourses" WHERE "courseId" = ?', {
      replacements: [params.courseId],
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

  static async getMembersByCourse(courseId) {
    return models.User.findAll({
      include: [
        {
          model: models.Course,
          as: 'courses',
          where: {
            id: courseId,
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
      const course = await models.Course.findByPk(params.courseId);

      // add the member to this course
      await models.MemberCourse.create({
        memberId: member.id,
        courseId: params.courseId,
      });
      await MeetingRoomsHelper.joinMeetingRoom(course.meetingRoomId, member.id);

      return [201, { member }, `${member.username} has been added to the course`];
    }
  }

  static async unEnrollMember(req) {
    const {
      params: { courseId, memberId },
    } = req;
    const course = await models.Course.findByPk(courseId);

    await models.MemberCourse.destroy({
      where: {
        memberId,
        courseId,
      },
    });

    await MeetingRoomsHelper.leaveMeetingRoom(course.meetingRoomId, memberId);

    return [200, undefined, 'Member has been enrolled from the course.'];
  }

  static async addMember(req) {
    const {
      params: { courseId },
      body: { members },
    } = req;
    const course = await models.Course.findByPk(courseId);

    const memberList = await models.User.findAll({
      where: {
        id: members,
      },
    });

    await Promise.all(
      memberList.map(async member => {
        await models.MemberCourse.findOrCreate({
          defaults: {
            memberId: member.id,
            courseId,
          },
          where: {
            memberId: member.id,
            courseId,
          },
        });
        await MeetingRoomsHelper.joinMeetingRoom(course.meetingRoomId, member.id);
      })
    );
    return [200, { members: memberList }, 'Members have been added to the course'];
  }
}

export default MemberCourseController;
