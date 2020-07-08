import React from 'react';
import MultipleSwitchField from '@doorward/ui/components/Input/MultipleSwitchField';
import { Question } from '@doorward/common/models/Question';
import { Answer } from '@doorward/common/models/Answer';

const AnswersView: React.FunctionComponent<AnswersViewProps> = ({ question, answers }) => {
  return (
    <div className="answers-view">
      <MultipleSwitchField
        name={`answers[${question.id}]`}
        singleChoice
        choices={answers.map(answer => answer.answer)}
        values={answers.map(answer => answer.id)}
      />
    </div>
  );
};

export interface AnswersViewProps {
  answers: Array<Answer>;
  question: Question;
}

export default AnswersView;
