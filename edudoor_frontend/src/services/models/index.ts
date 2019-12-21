export interface Model {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
export interface Organization extends Model {
  name: string;
  description?: string;
}

export interface Role extends Model {
  name: string;
  description?: string;
  organizationId: string;
  organization: Organization;
}

export interface User extends Model {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  country: string;
  fullName: string;
  city: string;
  organizationId: string;
  organization: Organization;
  roles: Array<Role>;
  status: string;
}

export interface Student extends User {
  courses: Array<Course>;
  coursesInProgress: Array<Course>;
}

export interface CourseCreator extends User {
  authoredCourses: Array<Course>;
}

export interface Module extends Model {
  title: string;
  description?: string;
  courseId: string;
  order: number;
  course: Course;
  items: Array<ModuleItem>;
}

export type ModuleItemTypes = 'Page' | 'Assignment' | 'File' | 'Discussion Forum' | 'Quiz';

export type AssignmentSubmissionType = 'Text Entry' | 'Website URL' | 'Media Recording' | 'File Upload';

export interface ModuleItem extends Model {
  title: string;
  content: any;
  order: number;
  type: ModuleItemTypes;
  questions: Array<Question>;
}

export interface Assignment extends ModuleItem {
  content: {
    points: number;
    submissionMedia: 'online' | 'offline';
    submissionType: Array<AssignmentSubmissionType>;
    dueDate: string | Date | null;
    assignment: any;
    availability: {
      from: string | Date | null;
      to: string | Date | null;
    };
  };
}

export interface Quiz extends ModuleItem {
  content: {
    instructions: string;
    options: {
      shuffleAnswers: boolean;
      timeLimit: {
        allow: boolean;
        minutes: number;
      };
      attempts: {
        multiple: boolean;
        keepScore: 'Highest' | 'Latest' | 'Average';
        max: number;
      };
      questions: {
        oneAtATime: boolean;
        lockAfterAnswering: boolean;
      };
      restrictions: {
        accessCode: {
          require: boolean;
          code: string;
        };
      };
      responses: {
        show: boolean;
        frequency: {
          onlyOnce: boolean;
          range: {
            allow: boolean;
            from: string | Date | null;
            to: string | Date | null;
          };
        };
      };
      dueDate: string;
      availability: {
        from: string | Date | null;
        to: string | Date | null;
      };
    };
    questions: Array<Question>;
  };
}

export interface Question extends Model {
  question: any;
  points: number;
  answers: Array<Answer>;
}

export interface Answer extends Model {
  answer: string;
  description: any;
  correct: boolean;
}

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
}

export interface MeetingRoom extends Model {
  id: string;
  sessionId: string;
  sessionName: string;
  status: string;
  token: string;
  user: string;
}
