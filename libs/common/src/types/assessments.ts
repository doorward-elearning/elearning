import { AnswerTypes } from '@doorward/common/types/exam';

export interface QuestionSectionOptions {
  questions: {
    allCompulsory: boolean;
    numRequired: number;
    answers: {
      answerAll: boolean; // Allow student to answer all the questions
    };
  };
}

export interface AssessmentOptions {
  shuffleAnswers: boolean;
  timeLimit: {
    allow: boolean;
    minutes: number;
  };
  attempts: {
    multiple: boolean;
    keepScore: ScoreToKeep;
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
  availability: {
    from: string | Date | null;
    to: string | Date | null;
  };
}

export enum ScoreToKeep {
  HIGHEST = 'highest',
  LATEST = 'latest',
  AVERAGE = 'average',
}

export interface AssessmentAnswerResult {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
  answer: string;
  description: string;
  correct: boolean;
  points: number;
}

export interface AssessmentQuestionResult {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
  question: string;
  points: number;
  type: AnswerTypes;
  answers: Array<AssessmentAnswerResult>;
  graded: boolean;
  answerId?: string;
  answer?: string;
  isCorrect?: boolean;
  comments?: string;
}

export interface AssessmentSubmission {
  [questionId: string]: string;
}

export interface AssessmentSubmissionResult {
  questions: {
    [questionId: string]: AssessmentQuestionResult;
  };
  totalPoints: number;
}
