import Api from '../../openolat/api';

class UserController {
  static async login(req) {
    const { username, password } = req.body;

    const response = await Api.auth.login(username, password);

    return [200, [response.data], 'Login successful'];
  }
}

export default UserController;
