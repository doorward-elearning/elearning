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

const DisplayAnswersView: React.FunctionComponent<DisplayAnswersViewProps> = ({ answers }) => {
  return (
    <List>
      {answers.map((answer, index) => {
        return (
          <ListItem>
            <div className="answer-view-item">
              {answer.correct && <div className="correct-answer-display">{translate('correctAnswer')}</div>}
              <span>{index + 1}. </span>
              <span>{answer.answer}</span>
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

const AnswersView: React.FunctionComponent<AnswersViewProps> = ({ question, answers, view }) => {
  const [editable, setEditable] = useState(true);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState();

  useEffect(() => {
    if (answers) {
      setNumCorrectAnswers(answers.reduce((acc, cur) => acc + (cur.correct ? 1 : 0), 0));
    }
  }, [answers]);

  useEffect(() => {
    if (view === QuestionViewTypes.EDIT_MODE || view === QuestionViewTypes.ANSWER_PREVIEW_MODE) {
      setEditable(false);
    }
    setEditable(view === QuestionViewTypes.EXAM_MODE);
  }, [view]);

  return (
    <div className="ed-answers-view">
      {editable ? (
        <MultipleSwitchField
          choices={answers.map((answer) => answer.answer)}
          values={answers.map((answer) => answer.id)}
          name={`submission[${question.id}]`}
          singleChoice={numCorrectAnswers === 1}
        />
      ) : (
        <DisplayAnswersView answers={answers} />
      )}
    </div>
  );
};

export interface AnswersViewProps {
  answers: Array<AnswerEntity | CreateAnswerBody>;
  question: QuestionEntity | CreateQuestionBody;
  view?: QuestionViewTypes;
}

export interface DisplayAnswersViewProps {
  answers: Array<AnswerEntity | CreateAnswerBody>;
}

export default AnswersView;
