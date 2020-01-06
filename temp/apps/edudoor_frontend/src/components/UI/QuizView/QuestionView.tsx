import React, { useContext, useEffect, useState } from 'react';
import DraftHTMLContent from '@edudoor/ui/src/components/DraftHTMLContent';
import { Question } from '../../../../../../libs/shared/models';
import _ from 'lodash';
import AnswersView from './AnswersView';
import { QuizContext } from './index';
import Panel from '@edudoor/ui/src/components/Panel';
import Header from '@edudoor/ui/src/components/Header';
import Row from '@edudoor/ui/src/components/Row';

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
