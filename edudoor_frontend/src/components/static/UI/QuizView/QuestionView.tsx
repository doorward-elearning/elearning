import React, { useContext, useEffect, useState } from 'react';
import DraftHTMLContent from '../../../ui/DraftHTMLContent';
import { Question, Quiz } from '../../../../services/models';
import Row from '../../../ui/Row';
import _ from 'lodash';
import AnswersView from './AnswersView';
import { QuizContext } from './index';

const QuestionView: React.FunctionComponent<QuestionViewProps> = ({ question, index }) => {
  const [answers, setAnswers] = useState(question.answers);
  const { quiz } = useContext(QuizContext);

  useEffect(() => {
    if (quiz?.content.options.shuffleAnswers) {
      setAnswers(_.shuffle(answers));
    }
  }, [quiz]);
  return (
    <div className="question-view">
      <Row style={{ gridTemplateColumns: '2em 1fr', alignItems: 'start' }}>
        <span>{index}</span>
        <div>
          <DraftHTMLContent content={question.question} />
          <AnswersView answers={answers} question={question} />
        </div>
      </Row>
    </div>
  );
};

export interface QuestionViewProps {
  question: Question;
  index: number;
}

export default QuestionView;
