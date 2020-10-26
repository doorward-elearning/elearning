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