import React, { useContext, useEffect, useState } from 'react';
import DraftHTMLContent from '@edudoor/ui/components/DraftHTMLContent';
import _ from 'lodash';
import AnswersView from './AnswersView';
import { QuizContext } from './index';
import Panel from '@edudoor/ui/components/Panel';
import Header from '@edudoor/ui/components/Header';
import Row from '@edudoor/ui/components/Row';
import { Question } from '@edudoor/common/models';

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
  question: Question;
  index: number;
}

export default QuestionView;
