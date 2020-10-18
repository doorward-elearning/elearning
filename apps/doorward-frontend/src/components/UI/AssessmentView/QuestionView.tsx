import React, { useContext, useEffect, useState } from 'react';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import _ from 'lodash';
import { AssessmentContext } from './index';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { CreateQuestionBody } from '@doorward/common/dtos/body';
import Spacer from '@doorward/ui/components/Spacer';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import Icon from '@doorward/ui/components/Icon';
import { AnswerTypes } from '@doorward/common/types/exam';
import AnswersView from './AnswersView';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';
import Row from '@doorward/ui/components/Row';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';

export enum QuestionViewTypes {
  EDIT_MODE = 'editMode',
  ANSWER_PREVIEW_MODE = 'answerPreviewMode',
  EXAM_MODE = 'examMode',
}

const QuestionView: React.FunctionComponent<QuestionViewProps> = ({
  question,
  view,
  onEditQuestion,
  onDeleteQuestion,
}) => {
  const [answers, setAnswers] = useState(question.answers);
  const { assessment } = useContext(AssessmentContext);

  useEffect(() => {
    if (view === QuestionViewTypes.EDIT_MODE) {
      setAnswers(question.answers);
    }
  }, [question.answers]);

  useEffect(() => {
    if (view !== QuestionViewTypes.EDIT_MODE) {
      if (assessment?.options.shuffleAnswers) {
        setAnswers(_.shuffle(answers));
      }
    }
  }, [assessment]);

  return (
    <div className="question-view">
      <Panel noBackground>
        <HeaderGrid>
          <Header size={4}>{question.points} Points</Header>
          {view === QuestionViewTypes.EDIT_MODE && (
            <Row>
              <Icon onClick={() => onDeleteQuestion(question)} icon="delete" />
              <Icon onClick={() => onEditQuestion(question)} icon="edit" />
            </Row>
          )}
        </HeaderGrid>
        <div>
          <DraftHTMLContent content={question.question} />
          <Spacer />
          {question.type === AnswerTypes.MULTIPLE_CHOICE ? (
            <AnswersView answers={answers} question={question} view={view} />
          ) : view === QuestionViewTypes.EXAM_MODE ? (
            <DraftTextArea fluid name={`submission[${question.id}]`} />
          ) : (
            <DisplayLabel>
              <i>No choices for this question...</i>
            </DisplayLabel>
          )}
        </div>
      </Panel>
      <Spacer />
    </div>
  );
};

export interface QuestionViewProps {
  question: QuestionEntity | CreateQuestionBody;
  view?: QuestionViewTypes;
  onEditQuestion?: (question: CreateQuestionBody) => void;
  onDeleteQuestion?: (question: CreateQuestionBody) => void;
}

export default QuestionView;
