import { CREATE_CLASSROOM, FETCH_SCHOOL, FETCH_SCHOOLS } from './types';
import { CreateClassroomBody } from '../../services/models/requestBody';

export const fetchSchoolsAction = () => ({
  type: FETCH_SCHOOLS,
});

export const fetchSchoolAction = (schoolId: string) => ({
  type: FETCH_SCHOOL,
  payload: [schoolId],
});

export const createClassroom = (schoolId: string,body: CreateClassroomBody) => ({
  type: CREATE_CLASSROOM,
  payload: [schoolId, body]
});
