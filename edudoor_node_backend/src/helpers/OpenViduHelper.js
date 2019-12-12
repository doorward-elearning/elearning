import Api from '../modules/openvidu/api';

class OpenViduHelper {
  static async createSession() {
    const data = JSON.stringify({});

    return Api.post('/api/sessions', data);
  }

  static async getToken(sessionId, role = 'PUBLISHER') {
    const data = JSON.stringify({
      session: sessionId,
      role,
    });

    return Api.post('/api/tokens', data);
  }

  static async getSession(sessionId) {
    return Api.get(`/api/sessions/${sessionId}`);
  }
}

export default OpenViduHelper;
