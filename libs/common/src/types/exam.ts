import { QuizOptions } from '@doorward/common/types/quiz';

export interface ExamOptions extends QuizOptions {}

export enum AnswerTypes {
  MULTIPLE_CHOICE = 'Multiple Choice',
  TEXT_INPUT = 'Text input',
  MULTIPLE_CHOICE_DESCRIPTIVE = 'Multiple choice descriptive',
}
