import { ModuleItem } from '@doorward/common/models/ModuleItem';
import { Question } from '@doorward/common/models/Question';

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
