import Sequelize from 'sequelize';
import models from '../../database/models';
import { CourseInclude, StudentCoursesInclude } from '../../utils/includes';
import ModulesController from './modules/ModulesController';
import ModulesHelper from '../../helpers/ModulesHelper';
import CourseHelper from '../../helpers/CourseHelper';
import Tools from '../../utils/Tools';
import MeetingRoomsHelper from '../../helpers/MeetingRoomsHelper';
import Socket from '../../websocket/Socket';
import { LIVE_CLASSROOM_STARTED } from '../../websocket/types';
import OpenViduHelper from '../../helpers/OpenViduHelper';

class CourseController {
  static async createCourse(req) {
    const {
      body: { modules, ...other },
      user: { id: userId },
    } = req;

    const course = await models.Course.create(
      { ...other, createdBy: userId },
      {
        include: CourseInclude,
      }
    );

    await Promise.all(
      modules.map(async module => {
        return ModulesController.createModule(course.id, module);
      })
    );

    await course.reload();

    return [201, { course }, 'Course created successfully'];
  }

  static async updateCourseModules(req) {
    const { body, params } = req;
    const { modules } = body;

    await Promise.all(modules.map(ModulesHelper.updateModule));

    const { modules: updatedModules } = await CourseHelper.getCourse(params.courseId);

    return [200, { modules: updatedModules }, 'Modules have been updated.'];
  }

  static async updateCourse(req) {
    const {
      body: { ...other },
      params: { courseId },
    } = req;

    const course = (
      await models.Course.update(
        { ...other },
        {
          where: { id: courseId },
          include: CourseInclude,
          returning: true,
        }
      )
    )[1][0];
    await course.reload();

    return [200, { course }, 'Course has been updated.'];
  }

  static async getCourses(req) {
    const { user } = req;

    let courses;
    if (Tools.isStudent(user)) {
      // eslint-disable-next-line prefer-destructuring
      courses = (
        await models.User.findByPk(user.id, {
          include: StudentCoursesInclude(),
        })
      ).courses;
    } else {
      courses = await models.Course.findAll({
        includeIgnoreAttributes: false,
        include: [
          {
            model: models.User,
            as: 'students',
            attributes: [],
            required: false,
            subQuery: true,
          },
          {
            model: models.User,
            as: 'author',
            where: Tools.isAdmin(user)
              ? {}
              : {
                  id: user.id,
                },
            attributes: [],
          },
        ],
        attributes: {
          include: [[Sequelize.fn('COUNT', Sequelize.col('students.id')), 'numStudents']],
        },
        group: ['Course.id'],
        order: [['createdAt', 'desc']],
      });
    }

    return [200, { courses }];
  }

  static async getCourse(req) {
    const {
      params: { courseId },
    } = req;
    const course = await CourseHelper.getCourse(courseId);

    course.dataValues.itemCount = CourseHelper.courseItemStats(course);
    // check meeting
    const meeting = course.meetingRoom?.currentMeeting;
    if (meeting) {
      if (meeting.status === 'STARTED') {
        try {
          await OpenViduHelper.getToken(meeting.sessionId);
        } catch (e) {
          course.meetingRoom.currentMeeting = null;
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

    return [200, { course }];
  }

  static async startMeeting(req) {
    const { params, user } = req;

    const course = await CourseHelper.createMeetingRoom(params.courseId, user.id);

    const { meetingRoom } = course;

    if (!(await models.Meeting.findOne({ where: { meetingRoomId: meetingRoom.id, status: 'STARTED' } }))) {
      await MeetingRoomsHelper.createMeeting(meetingRoom.id, user.id);
    }

    const students = await CourseHelper.getStudentsForCourse(course.id);

    Socket.send(students, LIVE_CLASSROOM_STARTED, {
      courseId: course.id,
    });

    return CourseHelper.joinCourseMeetingRoom(meetingRoom, user);
  }

  static async joinMeeting(req) {
    const { params, user } = req;
    const course = await models.Course.findByPk(params.courseId);

    const meetingRoom = await models.Meeting.findOne({
      where: {
        courseId: course.id,
        status: 'STARTED',
      },
    });
    return CourseHelper.joinMeeting(course, meetingRoom, user);
  }

  static async deleteCourse(req) {
    const {
      params: { courseId },
    } = req;

    await models.Course.destroy({ where: { id: courseId } });

    return [200, undefined, 'Course has been deleted.'];
  }
}

export default CourseController;
