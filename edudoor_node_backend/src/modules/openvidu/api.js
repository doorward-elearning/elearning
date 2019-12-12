import btoa from 'btoa';
import axios from 'axios';
import https from 'https';

class Api {
  static async post(url, data) {
    const response = await axios.post(`${process.env.OPENVIDU_URL}${url}`, data, {
      headers: {
        Authorization: `Basic ${btoa(`${process.env.OPENVIDU_USERNAME}:${process.env.OPENVIDU_PASSWORD}`)}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    return response.data;
  }
}

export default Api;
