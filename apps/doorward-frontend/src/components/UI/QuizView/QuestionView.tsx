import React, { useContext, useEffect, useState } from 'react';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import _ from 'lodash';
import AnswersView from './AnswersView';
import { QuizContext } from './index';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import Row from '@doorward/ui/components/Row';
import QuestionEntity from '@doorward/common/entities/question.entity';

const QuestionView: React.FunctionComponent<QuestionViewProps> = ({ question, index }) => {
  const [answers, setAnswers] = useState(question.answers);
  const { quiz } = useContext(QuizContext);

  useEffect(() => {
    if (quiz?.options.shuffleAnswers) {
      setAnswers(_.shuffle(answers));
    }
  }, [quiz]);
  return (
    <div className="question-view">
      <Panel noBackground>
        <Row style={{ justifyContent: 'space-between', marginBottom: 'var(--padding-lg)' }}>
          <Header size={3}>Question {index}</Header>
          <b>{question.points} Points</b>
        </Row>
        <div>
          <DraftHTMLContent content={question.question} />
          <AnswersView answers={answers} question={question} />
        </div>
      </Panel>
    </div>
  );
};

export interface QuestionViewProps {
  question: QuestionEntity;
  index: number;
}

export default QuestionView;
