import socketIOClient from 'socket.io-client';
import Tools from './Tools';

const baseUrl = process.env.REACT_APP_BASE_URL || '';

const serverUrl = baseUrl.replace('/api/v1/', '');

export const connectSocket = () => {
  const token = Tools.getToken();
  const query = token ? { token } : {};
  return socketIOClient(serverUrl, {
    transports: ['websocket', 'polling'],
    query,
  });
};
