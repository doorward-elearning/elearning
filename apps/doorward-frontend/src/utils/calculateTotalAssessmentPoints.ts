import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';

const calculateTotalAssessmentPoints = (assessment: AssessmentEntity) => {
  return assessment.sections.reduceRight((acc, section, index) => {
    if (section.config.questions.allCompulsory) {
      return acc + section.points;
    } else {
      const required = section.config.questions.numRequired;
      const totalQuestions = section.questions.length;
      const pointsForEach = Math.round(section.points / totalQuestions);
      return acc + pointsForEach * required;
    }
  }, 0);
};

export default calculateTotalAssessmentPoints;
