import ChatApi from '@doorward/common/apis/doorward.chat.api';
import Tools from '@doorward/common/utils/Tools';
import buildApiReducer from '@doorward/api-actions/build.api.reducer';

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
