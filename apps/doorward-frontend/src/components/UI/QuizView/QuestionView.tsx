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
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import Icon from '@doorward/ui/components/Icon';

export enum QuestionViewTypes {
  EDIT_MODE = 'editMode',
  ANSWER_PREVIEW_MODE = 'answerPreviewMode',
}

const QuestionView: React.FunctionComponent<QuestionViewProps> = ({ question, index, view, onEditQuestion }) => {
  const [answers, setAnswers] = useState(question.answers);
  const { quiz } = useContext(QuizContext);

  useEffect(() => {
    if (view === QuestionViewTypes.EDIT_MODE) {
      setAnswers(question.answers);
    }
  }, [question.answers]);

  useEffect(() => {
    if (view !== QuestionViewTypes.EDIT_MODE) {
      if (quiz?.options.shuffleAnswers) {
        setAnswers(_.shuffle(answers));
      }
    }
  }, [quiz]);

  return (
    <div className="question-view">
      <Panel noBackground>
        <HeaderGrid>
          <Header size={4}>{question.points} Points</Header>
          {view === QuestionViewTypes.EDIT_MODE && <Icon onClick={() => onEditQuestion(question)} icon="edit" />}
        </HeaderGrid>
        <div>
          <DraftHTMLContent content={question.question} />
          <Spacer />
          <AnswersView answers={answers} question={question} view={view} />
        </div>
      </Panel>
      <Spacer />
    </div>
  );
};

export interface QuestionViewProps {
  question: QuestionEntity | CreateQuestionBody;
  index: number;
  view?: QuestionViewTypes;
  onEditQuestion?: (question: CreateQuestionBody) => void;
}

export default QuestionView;
