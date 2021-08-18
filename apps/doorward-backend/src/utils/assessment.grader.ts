import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import { Connection } from 'typeorm';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { AnswerTypes } from '@doorward/common/types/exam';
import { AssessmentQuestionResult, AssessmentSubmissionResult } from '@doorward/common/types/assessments';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';
import calculateTotalAssessmentPoints from '@doorward/common/utils/calculateTotalAssessmentPoints';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';

const gradeQuestion = async (questionEntity: QuestionEntity, response: string): Promise<AssessmentQuestionResult> => {
  const result = { ...questionEntity, points: 0, graded: true };

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
        ...result,
        answerId: response,
        points,
        isCorrect: answerEntity.correct || questionEntity.type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE,
      };
    }

    return { ...result, isCorrect: false };
  } else {
    return { ...result, answer: response, graded: false };
  }
};

const calculateSectionPoints = (section: QuestionSectionEntity, submissionResult: AssessmentSubmissionResult) => {
  if (section.config.questions.allCompulsory) {
    return section.questions.reduce((acc, question) => acc + submissionResult.questions[question.id].points, 0);
  } else {
    const numRequired = section.config.questions.numRequired;

    const sortedQuestions = section.questions.sort(
      (a, b) => submissionResult.questions[b.id].points - submissionResult.questions[a.id].points
    );

    return sortedQuestions
      .slice(0, numRequired)
      .reduce((acc, question) => acc + submissionResult.questions[question.id].points, 0);
  }
};

const calculatePoints = (assessment: AssessmentEntity, submissionResult: AssessmentSubmissionResult) => {
  let totalPoints = 0;
  assessment.sections.map((section) => {
    totalPoints += calculateSectionPoints(section, submissionResult);
  });

  return totalPoints;
};

/**
 * This is required for the database migrations.
 * @param submissionId
 * @param connection
 */
const assessmentGrader = async (submissionId: string, connection: Connection) => {
  const assessmentSubmissionRepository = connection.getRepository(AssessmentSubmissionEntity);
  const submissionEntity = await assessmentSubmissionRepository.findOne(submissionId, {
    relations: [
      'assessment',
      'assessment.sections',
      'assessment.sections.questions',
      'assessment.sections.questions.answers',
    ],
  });

  const assessment = submissionEntity.assessment;

  const submission = JSON.parse(submissionEntity.submission);

  let allGraded = true;

  const submissionResult: AssessmentSubmissionResult = {
    questions: {},
    totalPoints: 0,
  };

  await Promise.all(
    assessment.sections.map(async (section) => {
      await Promise.all(
        section.questions.map(async (question) => {
          const result = await gradeQuestion(question, submission[question.id]);
          if (!result?.graded) {
            allGraded = false;
          }
          submissionResult.questions[question.id] = result;
          return result;
        })
      );
    })
  );

  const totalPoints = calculatePoints(assessment, submissionResult);

  submissionResult.totalPoints = calculateTotalAssessmentPoints(assessment);
  submissionEntity.submissionResults = JSON.stringify(submissionResult);
  submissionEntity.grade = totalPoints;

  if (allGraded) {
    submissionEntity.gradedOn = new Date();
    submissionEntity.status = AssessmentSubmissionStatus.GRADED;
  }

  await assessmentSubmissionRepository.save(submissionEntity);
};

export default assessmentGrader;
