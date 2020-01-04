import React from 'react';
import { Answer, Question } from '../../../../services/models';
import MultipleSwitchField from '../../../ui/Input/MultipleSwitchField';

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
