import models from '../database/models';
import { MyCoursesInclude } from '../utils/includes';
import OpenViduHelper from './OpenViduHelper';
import Tools from '../utils/Tools';

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

  static courseItemStats(course) {
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

  static moduleItemStats(module) {
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

  static async joinMeetingRoom(course, meetingRoom, user) {
    const role = course.createdBy === user.id ? 'MODERATOR' : 'SUBSCRIBER';

    if (meetingRoom) {
      const { token } = await OpenViduHelper.getToken(meetingRoom.sessionId, role);
      return [
        200,
        { id: meetingRoom.id, sessionId: meetingRoom.sessionId, sessionName: course.title, token },
        'Room has been started.',
      ];
    }
    return [404, undefined, 'Room for this course has not been started.'];
  }
}

export default CourseHelper;
