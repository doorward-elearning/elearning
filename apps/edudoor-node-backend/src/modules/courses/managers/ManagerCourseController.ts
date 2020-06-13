import models from '../../../database/models';

export default class ManagerCourseController {
  static async getManagers(req) {
    const {
      params: { courseId },
    } = req;

    const managers = await models.User.findAll({
      include: [
        {
          model: models.Course,
          as: 'managedCourses',
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

    return [200, { managers }];
  }
  static async enrollCourseManager(req) {
    const {
      params: { courseId },
      body: { managerId },
      user,
    } = req;

    const manager = await models.User.findByPk(managerId);
    await models.CourseManager.findOrCreate({
      defaults: {
        managerId,
        courseId,
        enrolledById: user.id,
      },
      where: {
        managerId,
        courseId,
      },
    });

    return [200, { manager }, `${manager.fullName} has been added as a course manager.`];
  }
}
