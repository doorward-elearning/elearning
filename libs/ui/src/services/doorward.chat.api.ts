import buildApiReducer, { ApiReducerMiddleware, generateActionsTypes } from '@doorward/ui/reducers/apiReducer';
import ChatApi from '@doorward/common/apis/doorward.chat.api';

export const DoorwardChatApiTypes = generateActionsTypes(ChatApi(), 'DoorwardChatApi');


const middleware: ApiReducerMiddleware<ReturnType<typeof ChatApi>> = {};

const apiReducer = buildApiReducer(
  ChatApi({
    baseURL: process.env.REACT_APP_CHAT_API_URL,
  }),
  'DoorwardChatApi',
  middleware
);

const DoorwardChatApi = apiReducer.actions;

export const DoorwardChatApiReducers = apiReducer.reducers;

export default DoorwardChatApi;
