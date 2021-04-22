import React, { useEffect, useState } from 'react';
import AnswerEntity from '@doorward/common/entities/answer.entity';
import './styles/AnswersView.scss';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { CreateAnswerBody, CreateQuestionBody } from '@doorward/common/dtos/body';
import List from '@doorward/ui/components/List';
import ListItem from '@doorward/ui/components/List/ListItem';
import { QuestionViewTypes } from './QuestionView';
import MultipleSwitchField from '@doorward/ui/components/Input/MultipleSwitchField';
import translate from '@doorward/common/lang/translate';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import { AnswerTypes } from '@doorward/common/types/exam';
import classNames from 'classnames';
import { AssessmentOptions, AssessmentQuestionResult } from '@doorward/common/types/assessments';

const DisplayAnswersView: React.FunctionComponent<DisplayAnswersViewProps> = ({
  answers,
  type,
  chosenAnswer,
  view,
  options,
}) => {
  const maxPoints = Math.max(...answers.map((answer) => answer.points));
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [showChosenAnswer, setShowChosenAnswer] = useState(false);
  const [showPoints, setShowPoints] = useState(false);

  useEffect(() => {
    if (view === QuestionViewTypes.SUBMISSION_MODE) {
      setShowCorrectAnswers(options?.responses?.show);
    } else {
      setShowCorrectAnswers(true);
    }

    if (view === QuestionViewTypes.SUBMISSION_MODE) {
      setShowChosenAnswer(true);
    }

    if (
      (view === QuestionViewTypes.ANSWER_PREVIEW_MODE || view === QuestionViewTypes.EDIT_MODE) &&
      type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE
    ) {
      setShowPoints(true);
    }
  }, [view, options]);
  return (
    <List>
      {answers.map((answer, index) => {
        return (
          <ListItem key={answer.id}>
            <div className="answer-view-item">
              {answer.correct && showCorrectAnswers && (
                <div className="correct-answer-display">{translate('correctAnswer')}</div>
              )}
              {(showCorrectAnswers ? !answer.correct : true) && chosenAnswer === answer.id && showChosenAnswer && (
                <div
                  className={classNames('chosen-answer-display', {
                    correct: type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE,
                  })}
                >
                  {translate('chosenAnswer')}
                </div>
              )}
              <DraftHTMLContent content={answer.answer} />
              {showPoints && (
                <div
                  className={classNames('answer-points-display', {
                    correct: maxPoints === answer.points,
                  })}
                >
                  {translate('pointsWithCount', { count: answer.points })}
                </div>
              )}
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

const AnswersView: React.FunctionComponent<AnswersViewProps> = ({
  disabled,
  question,
  answers,
  assessmentOptions,
  view,
}) => {
  const [editable, setEditable] = useState(true);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(1);

  useEffect(() => {
    if (answers) {
      if (question.type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE) {
        setNumCorrectAnswers(1);
      } else {
        setNumCorrectAnswers(answers.reduce((acc, cur) => acc + (cur.correct ? 1 : 0), 0));
      }
    }
  }, [answers]);

  useEffect(() => {
    if (
      view === QuestionViewTypes.EDIT_MODE ||
      view === QuestionViewTypes.ANSWER_PREVIEW_MODE ||
      view === QuestionViewTypes.SUBMISSION_MODE
    ) {
      setEditable(false);
    }
    setEditable(view === QuestionViewTypes.EXAM_MODE);
  }, [view]);

  return (
    <div className="ed-answers-view">
      {editable ? (
        <MultipleSwitchField
          editable={!disabled}
          choices={answers.map((answer) => answer.answer)}
          itemRenderer={(value) => <DraftHTMLContent content={value} />}
          values={answers.map((answer) => answer.id)}
          name={`submission[${question.id}]`}
          singleChoice={numCorrectAnswers === 1}
        />
      ) : (
        <DisplayAnswersView
          answers={answers}
          chosenAnswer={(question as AssessmentQuestionResult).answerId}
          type={question.type}
          view={view}
          options={assessmentOptions}
        />
      )}
    </div>
  );
};

export interface AnswersViewProps {
  answers: Array<AnswerEntity | CreateAnswerBody>;
  question: QuestionEntity | CreateQuestionBody | AssessmentQuestionResult;
  view?: QuestionViewTypes;
  assessmentOptions?: AssessmentOptions;
  disabled?: boolean;
}

export interface DisplayAnswersViewProps {
  answers: Array<AnswerEntity | CreateAnswerBody>;
  type: AnswerTypes;
  view: QuestionViewTypes;
  chosenAnswer: string;
  options?: AssessmentOptions;
}

export default AnswersView;
