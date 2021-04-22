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
import { AssessmentOptions, AssessmentQuestionResult } from '@doorward/common/types/assessments';

export enum QuestionViewTypes {
  /**
   * The teacher editing the questions
   */

  EDIT_MODE = 'editMode',
  /**
   * Display the correct answers
   */
  ANSWER_PREVIEW_MODE = 'answerPreviewMode',
  /**
   * A student taking an exam
   */
  EXAM_MODE = 'examMode',
  /**
   * A student viewing their submission
   */
  SUBMISSION_MODE = 'submissionMode',
}

const QuestionView: React.FunctionComponent<QuestionViewProps> = ({
  question,
  view,
  onEditQuestion,
  onDeleteQuestion,
  disabled,
  assessmentOptions,
  questionNumber,
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
            <React.Fragment>
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
            </React.Fragment>
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
            <AnswersView disabled={disabled} answers={answers} question={question} view={view} assessmentOptions={assessmentOptions} />
          ) : view === QuestionViewTypes.EXAM_MODE ? (
            <DraftTextArea editable={!disabled} fluid name={`submission[${question.id}]`} />
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
  assessmentOptions?: AssessmentOptions;
  questionNumber?: number;
  disabled?: boolean;
}

export default QuestionView;
