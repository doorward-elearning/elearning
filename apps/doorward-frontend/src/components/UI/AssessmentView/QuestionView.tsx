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
import translate from '@doorward/common/lang/translate';
import './styles/QuestionView.scss';
import classNames from 'classnames';
import { AssessmentQuestionResult } from '@doorward/common/types/assessments';

export enum QuestionViewTypes {
  EDIT_MODE = 'editMode',
  ANSWER_PREVIEW_MODE = 'answerPreviewMode',
  EXAM_MODE = 'examMode',
  SUBMISSION_MODE = 'submissionMode',
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
    if (view !== QuestionViewTypes.EXAM_MODE) {
      if (assessment?.options.shuffleAnswers) {
        setAnswers(_.shuffle(answers) as any);
      }
    }
  }, [assessment]);

  return (
    <div className="ed-question-view">
      <Panel noBackground>
        <HeaderGrid>
          <Header size={4}>
            {translate('points')}{' '}
            <div
              className={classNames('points-count', {
                success: (question as AssessmentQuestionResult).isCorrect,
                error: (question as AssessmentQuestionResult).isCorrect === false, // to prevent checking if
                // undefined or null
              })}
            >
              {question.points}
            </div>
          </Header>
          {view === QuestionViewTypes.EDIT_MODE && (
            <Row>
              <Icon onClick={() => onDeleteQuestion(question)} icon="delete" title={translate('delete')} />
              <Icon onClick={() => onEditQuestion(question)} icon="edit" title={translate('edit')} />
            </Row>
          )}
        </HeaderGrid>
        <div>
          <Panel>
            <DraftHTMLContent content={question.question} />
          </Panel>
          <Spacer />
          {question.type === AnswerTypes.MULTIPLE_CHOICE ||
          question.type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE ? (
            <AnswersView answers={answers} question={question} view={view} />
          ) : view === QuestionViewTypes.EXAM_MODE ? (
            <DraftTextArea fluid name={`submission[${question.id}]`} />
          ) : (
            <div className="no-choices-display">
              <DisplayLabel>
                <i>{translate('noChoicesForThisQuestion')}...</i>
              </DisplayLabel>
            </div>
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
