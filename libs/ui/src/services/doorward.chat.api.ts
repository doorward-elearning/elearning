import ChatApi from '@doorward/common/apis/doorward.chat.api';
import { buildApiReducer } from 'use-api-action';

const DoorwardChatApi = buildApiReducer(ChatApi({ baseURL: process.env.REACT_APP_CHAT_API_URL }), 'DoorwardChatApi');

export default DoorwardChatApi;
