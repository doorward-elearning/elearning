import React, { useContext, useEffect, useState } from 'react';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import _ from 'lodash';
import AnswersView from './AnswersView';
import { QuizContext } from './index';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { CreateQuestionBody } from '@doorward/common/dtos/body';
import Spacer from '@doorward/ui/components/Spacer';

export enum QuestionViewTypes {
  ANSWER_ONLY = 'answerOnly',
}

const QuestionView: React.FunctionComponent<QuestionViewProps> = ({ question, index, view }) => {
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
        <Header size={4}>{question.points} Points</Header>
        <div>
          <DraftHTMLContent content={question.question} />
          <Spacer />
          <AnswersView answers={answers} question={question} view={view} />
        </div>
      </Panel>
    </div>
  );
};

export interface QuestionViewProps {
  question: QuestionEntity | CreateQuestionBody;
  index: number;
  view?: QuestionViewTypes;
}

export default QuestionView;
