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
import { AssessmentQuestionResult } from '@doorward/common/types/assessments';

const DisplayAnswersView: React.FunctionComponent<DisplayAnswersViewProps> = ({
  answers,
  type,
  chosenAnswer,
  view,
}) => {
  const maxPoints = Math.max(...answers.map((answer) => answer.points));
  return (
    <List>
      {answers.map((answer, index) => {
        return (
          <ListItem key={answer.id}>
            <div className="answer-view-item">
              {answer.correct && <div className="correct-answer-display">{translate('correctAnswer')}</div>}
              {!answer.correct && chosenAnswer === answer.id && (
                <div
                  className={classNames('chosen-answer-display', {
                    correct: type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE,
                  })}
                >
                  {translate('chosenAnswer')}
                </div>
              )}
              <DraftHTMLContent content={answer.answer} />
              {type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE && view !== QuestionViewTypes.SUBMISSION_MODE && (
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

const AnswersView: React.FunctionComponent<AnswersViewProps> = ({ question, answers, view }) => {
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
        />
      )}
    </div>
  );
};

export interface AnswersViewProps {
  answers: Array<AnswerEntity | CreateAnswerBody>;
  question: QuestionEntity | CreateQuestionBody | AssessmentQuestionResult;
  view?: QuestionViewTypes;
}

export interface DisplayAnswersViewProps {
  answers: Array<AnswerEntity | CreateAnswerBody>;
  type: AnswerTypes;
  view: QuestionViewTypes;
  chosenAnswer: string;
}

export default AnswersView;
