import UserController from '../users/UserController';

class ReportsController {
  static async studentsReport(req) {
    const students = await UserController.findByRole('Student');

    return [200, { students }];
  }
}

export default ReportsController;
