import { Model } from '@edudoor/common/models/Model';
import { User } from '@edudoor/common/models/User';
import { Module } from '@edudoor/common/models/Module';
import { MeetingRoom } from './MeetingRoom';

export interface Course extends Model {
  title: string;
  description?: string;
  objectives?: string;
  requirements?: string;
  status: string;
  authorId: string;
  author: User;
  modules: Array<Module>;
  numStudents: string;
  itemCount: {
    assignments: number;
    quizzes: number;
    pages: number;
  };
  meetingRoom: MeetingRoom;
}
