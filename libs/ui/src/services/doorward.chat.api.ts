import buildApiReducer, { ApiReducerMiddleware } from '@doorward/ui/reducers/apiReducer';
import ChatApi from '@doorward/common/apis/doorward.chat.api';

const middleware: ApiReducerMiddleware<ReturnType<typeof ChatApi>> = {};

const DoorwardChatApi = buildApiReducer(
  ChatApi,
  'DoorwardChatApi',
  {
    baseURL: process.env.REACT_APP_CHAT_API_URL,
  },
  middleware
);

export default DoorwardChatApi;
