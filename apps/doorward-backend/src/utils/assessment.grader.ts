import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import { Connection } from 'typeorm';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { AnswerTypes } from '@doorward/common/types/exam';
import { AssessmentQuestionResult, AssessmentSubmissionResult } from '@doorward/common/types/assessments';

const gradeQuestion = async (questionEntity: QuestionEntity, response: string): Promise<AssessmentQuestionResult> => {
  if (
    questionEntity.type === AnswerTypes.MULTIPLE_CHOICE ||
    questionEntity.type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE
  ) {
    const answerEntity = questionEntity.answers.find((answer) => answer.id === response);
    if (answerEntity) {
      let points = answerEntity.correct ? questionEntity.points : 0;
      if (questionEntity.type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE) {
        points = answerEntity.points;
      }
      return {
        ...questionEntity,
        answerId: response,
        points,
        isCorrect: answerEntity.correct || questionEntity.type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE,
        graded: true,
      };
    }
  } else {
    return {
      answer: response,
      points: 0,
      graded: false,
      ...questionEntity,
    };
  }

  return null;
};

/**
 * This is required for the database migrations.
 * @param submissionId
 * @param connection
 */
const assessmentGrader = async (submissionId: string, connection: Connection) => {
  const assessmentSubmissionRepository = connection.getRepository(AssessmentSubmissionEntity);
  const submissionEntity = await assessmentSubmissionRepository.findOne(submissionId, {
    relations: ['assessment', 'assessment.questions', 'assessment.questions.answers'],
  });

  const assessment = submissionEntity.assessment;

  const submission = JSON.parse(submissionEntity.submission);

  let totalPoints = 0;
  let numGraded = 0;

  const submissionResult: AssessmentSubmissionResult = {
    questions: {},
    totalPoints: 0,
  };

  await Promise.all(
    assessment.questions.map(async (question) => {
      const result = await gradeQuestion(question, submission[question.id]);
      if (result?.graded) {
        totalPoints += result.points;
        numGraded++;
      }
      submissionResult.questions[question.id] = result;
      submissionResult.totalPoints += question.points;
      return result;
    })
  );

  submissionEntity.submissionResults = JSON.stringify(submissionResult);
  submissionEntity.grade = totalPoints;

  if (numGraded === assessment.questions.length) {
    // all questions have been graded.
    submissionEntity.gradedOn = new Date();
  }

  await assessmentSubmissionRepository.save(submissionEntity);
};

export default assessmentGrader;
