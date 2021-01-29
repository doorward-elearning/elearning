import ChatApi from '@doorward/common/apis/doorward.chat.api';
import { buildApiReducer } from 'use-api-action';
import Tools from '@doorward/common/utils/Tools';

const DoorwardChatApi = buildApiReducer(
  ChatApi(() => ({
    baseURL: process.env.REACT_APP_CHAT_API_URL,
    headers: {
      Authorization: 'Bearer ' + Tools.getToken(),
    },
  })),
  'DoorwardChatApi'
);

export default DoorwardChatApi;
