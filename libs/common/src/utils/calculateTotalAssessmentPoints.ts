import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';

const calculateTotalSectionPoints = (section: QuestionSectionEntity) => {
  if (section.config.questions.allCompulsory) {
    return section.questions.reduce((acc, question) => acc + question.points, 0);
  } else {
    const numRequired = section.config.questions.numRequired;

    const sortedQuestions = section.questions.sort((a, b) => b.points - a.points);

    return sortedQuestions.slice(0, numRequired).reduce((acc, question) => acc + question.points, 0);
  }
};

const calculateTotalAssessmentPoints = (assessment: AssessmentEntity) => {
  return assessment.sections.reduce((acc, section) => {
    return acc + calculateTotalSectionPoints(section);
  }, 0);
};

export default calculateTotalAssessmentPoints;
