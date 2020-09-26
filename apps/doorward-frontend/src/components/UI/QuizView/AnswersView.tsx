import React from 'react';
import MultipleSwitchField from '@doorward/ui/components/Input/MultipleSwitchField';
import AnswerEntity from '@doorward/common/entities/answer.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';

const AnswersView: React.FunctionComponent<AnswersViewProps> = ({ question, answers }) => {
  return (
    <div className="answers-view">
      <MultipleSwitchField
        name={`answers[${question.id}]`}
        singleChoice
        choices={answers.map((answer) => answer.answer)}
        values={answers.map((answer) => answer.id)}
      />
    </div>
  );
};

export interface AnswersViewProps {
  answers: Array<AnswerEntity>;
  question: QuestionEntity;
}

export default AnswersView;
