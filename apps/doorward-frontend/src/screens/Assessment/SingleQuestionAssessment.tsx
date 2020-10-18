import React, { useState } from 'react';
import TabLayout from '@doorward/ui/components/TabLayout';
import QuestionView from '../../components/UI/AssessmentView/QuestionView';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import QuestionEntity from '@doorward/common/entities/question.entity';

const SingleQuestionAssessment: React.FunctionComponent<SingleQuestionAssessmentProps> = ({
  questions,
}): JSX.Element => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  return (
    <div>
      <TabLayout stickyHeader selected={currentQuestion} controlled>
        {questions.map((question, index) => (
          <Tab title={`${index + 1}`}>
            <QuestionView question={question} index={index} />
          </Tab>
        ))}
      </TabLayout>
    </div>
  );
};

export interface SingleQuestionAssessmentProps {
  questions: Array<QuestionEntity>;
}

export default SingleQuestionAssessment;
