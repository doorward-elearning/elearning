import models from '../database/models';
import { MyCoursesInclude } from '../utils/includes';
import OpenViduHelper from './OpenViduHelper';
import MeetingRoomsHelper from './MeetingRoomsHelper';
import { CourseModuleStatistics } from '@edudoor/common/types/api';

class CourseHelper {
  static async getCourse(courseId) {
    return models.Course.findOne({
      where: { id: courseId },
      include: MyCoursesInclude(),
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

  static courseItemStats(course): CourseModuleStatistics {
    return course.modules.reduce(
      (acc, module) => {
        const stats = CourseHelper.moduleItemStats(module);
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

  static moduleItemStats(module): CourseModuleStatistics {
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

  static async joinCourseMeetingRoom(meetingRoom, participantId) {
    const meeting = await models.Meeting.findOne({
      where: {
        meetingRoomId: meetingRoom.id,
        status: 'STARTED',
      },
    });

    if (meeting) {
      const meetingInstance = await models.MeetingRoomMember.findOne({
        meetingRoomId: meetingRoom.id,
        participantId,
      });
      if (!meetingInstance) {
        return [403, undefined, 'You are not authorized to join this meeting'];
      }
      const { token } = await OpenViduHelper.getToken(meeting.sessionId, meetingInstance.role);

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
    return [404, undefined, 'No meeting has been started for this course.'];
  }

  static async createMeetingRoom(courseId, hostId) {
    const course = await models.Course.findByPk(courseId, {
      include: [
        {
          model: models.MeetingRoom,
          as: 'meetingRoom',
        },
      ],
    });
    if (!course.meetingRoom) {
      const meetingRoom = await models.MeetingRoom.create({
        title: `[Room] ${course.title}`,
      });
      await course.update({
        meetingRoomId: meetingRoom.id,
      });
    }
    await course.reload();
    await CourseHelper.addStudentsToCourseMeetingRoom(course.id);
    await MeetingRoomsHelper.joinMeetingRoom(course.meetingRoomId, hostId, 'MODERATOR');
    return course;
  }

  static async addStudentsToCourseMeetingRoom(courseId) {
    const course = await models.Course.findByPk(courseId, {
      include: [
        {
          model: models.MeetingRoom,
          as: 'meetingRoom',
        },
        {
          model: models.User,
          as: 'students',
        },
      ],
    });

    return Promise.all(
      course.students.map(async student => {
        return MeetingRoomsHelper.joinMeetingRoom(course.meetingRoomId, student.id);
      })
    );
  }

  static async getStudentsForCourse(courseId) {
    return models.User.findAll({
      include: [
        {
          model: models.Course,
          where: {
            id: courseId,
          },
          as: 'courses',
          attributes: [],
        },
      ],
    });
  }
}

export default CourseHelper;
