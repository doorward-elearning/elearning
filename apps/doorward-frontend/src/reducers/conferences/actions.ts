import {
  ADD_MODULE_ITEM,
  CREATE_CONFERENCE,
  CREATE_CONFERENCE_MANAGER,
  CREATE_CONFERENCE_MODULE,
  CREATE_CONFERENCE_MEMBER,
  DELETE_CONFERENCE,
  DELETE_CONFERENCE_MODULE,
  FETCH_CONFERENCE_MANAGERS,
  FETCH_CONFERENCE_MODULE,
  FETCH_CONFERENCE_MEMBERS,
  FETCH_CONFERENCES,
  FETCH_MODULE_ITEM,
  FETCH_MEMBERS_NOT_REGISTERED,
  LIST_MODULE_ITEMS,
  REGISTER_MEMBERS,
  REORDER_CONFERENCE_MODULES,
  START_LIVE_CLASSROOM,
  SUBMIT_ASSIGNMENT,
  UN_ENROLL_MEMBER,
  UPDATE_CONFERENCE,
  UPDATE_CONFERENCE_MODULE,
  VIEW_CONFERENCE,
  CREATE_POLL,
} from './types';
import {
  ConferenceModuleBody,
  ConferenceModuleItemBody,
  CreateConferenceBody,
  CreateConferenceManagerBody,
  CreateMemberBody,
  CreatePollBody,
  RegisterMembersBody,
  SearchQueryBody,
  SubmitAssignmentBody,
  UpdateModulesBody,
} from '../../services/models/requestBody';
import { Action } from '@doorward/ui/reducers/reducers';
import { ModuleItemTypes } from '@doorward/common/models';

export const fetchConferencesAction = (): Action => ({
  type: FETCH_CONFERENCES,
});

export const createConferenceAction = (body: CreateConferenceBody, successCallback: () => void): Action => ({
  type: CREATE_CONFERENCE,
  payload: body,
  onSuccess: successCallback,
});

export const fetchConferenceAction = (conferenceId: string): Action => ({
  type: VIEW_CONFERENCE,
  payload: [conferenceId],
});

export const createConferenceModuleAction = (conferenceId: string, module: ConferenceModuleBody): Action => ({
  type: CREATE_CONFERENCE_MODULE,
  payload: [conferenceId, module],
});

export const fetchConferenceModuleAction = (moduleId: string) => ({
  type: FETCH_CONFERENCE_MODULE,
  payload: [moduleId],
});

export const fetchConferenceMemberListAction = (conferenceId: string): Action => ({
  type: FETCH_CONFERENCE_MEMBERS,
  payload: [conferenceId],
});

export const unEnrollMemberAction = (memberId: string, conferenceId: string): Action => ({
  type: UN_ENROLL_MEMBER,
  payload: [memberId, conferenceId],
});

export const addConferenceMemberAction = (conferenceId: string, body: CreateMemberBody): Action => ({
  type: CREATE_CONFERENCE_MEMBER,
  payload: [conferenceId, body],
});

export const fetchMembersNotRegisteredAction = (conferenceId: string, query?: SearchQueryBody) => ({
  type: FETCH_MEMBERS_NOT_REGISTERED,
  payload: [conferenceId, query],
});

export const createConferenceModuleItemAction = (moduleId: string, item: ConferenceModuleItemBody): Action => ({
  type: ADD_MODULE_ITEM,
  payload: [moduleId, item],
});

export const updateConferenceAction = (conferenceId: string, body: CreateConferenceBody): Action => ({
  type: UPDATE_CONFERENCE,
  payload: [conferenceId, body],
});

export const updateConferenceModuleAction = (moduleId: string, body: ConferenceModuleBody): Action => ({
  type: UPDATE_CONFERENCE_MODULE,
  payload: [moduleId, body],
});

export const reorderConferenceModules = (conferenceId: string, body: UpdateModulesBody): Action => ({
  type: REORDER_CONFERENCE_MODULES,
  payload: [conferenceId, body],
});

export const registerMembers = (conferenceId: string, body: RegisterMembersBody): Action => ({
  type: REGISTER_MEMBERS,
  payload: [conferenceId, body],
});

export const startLiveClassroom = (conferenceId: string): Action => ({
  type: START_LIVE_CLASSROOM,
  payload: [conferenceId],
});

export const deleteConferenceAction = (conferenceId: string): Action => ({
  type: DELETE_CONFERENCE,
  payload: [conferenceId],
});

export const deleteConferenceModuleAction = (moduleId: string): Action => ({
  type: DELETE_CONFERENCE_MODULE,
  payload: [moduleId],
});

export const fetchModuleItems = (conferenceId: string, type: ModuleItemTypes): Action => ({
  type: LIST_MODULE_ITEMS,
  payload: [conferenceId, type],
});

export const fetchModuleItem = (itemId: string): Action => ({
  type: FETCH_MODULE_ITEM,
  payload: [itemId],
});

export const submitAssignmentAction = (assignmentId: string, body: SubmitAssignmentBody): Action => ({
  type: SUBMIT_ASSIGNMENT,
  payload: [assignmentId, body],
});

export const createConferenceManagerAction = (conferenceId: string, body: CreateConferenceManagerBody): Action => ({
  type: CREATE_CONFERENCE_MANAGER,
  payload: [conferenceId, body],
});

export const fetchConferenceManagersAction = (conferenceId: string): Action => ({
  type: FETCH_CONFERENCE_MANAGERS,
  payload: [conferenceId],
});

export const createPollAction = (conferenceId: string, body: CreatePollBody): Action => ({
  type: CREATE_POLL,
  payload: [conferenceId, body],
});
