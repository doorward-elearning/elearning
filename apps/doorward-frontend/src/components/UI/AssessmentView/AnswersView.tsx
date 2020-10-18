import React, { useEffect, useState } from 'react';
import AnswerEntity from '@doorward/common/entities/answer.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { CreateAnswerBody, CreateQuestionBody } from '@doorward/common/dtos/body';
import List from '@doorward/ui/components/List';
import ListItem from '@doorward/ui/components/List/ListItem';
import Row from '@doorward/ui/components/Row';
import Switch from '@doorward/ui/components/Switch';
import { QuestionViewTypes } from './QuestionView';
import MultipleSwitchField from '@doorward/ui/components/Input/MultipleSwitchField';

const DisplayAnswersView: React.FunctionComponent<DisplayAnswersViewProps> = ({ answers }) => {
  return (
    <List>
      {answers.map((answer) => {
        return (
          <ListItem>
            <Row style={{ justifyContent: 'start', gridGap: 'var(--padding-lg)' }}>
              <Switch open={answer.correct} onToggle={(open) => {}} disabled />
              <span>{answer.answer}</span>
            </Row>
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
    <div className="answers-view">
      {editable ? (
        <MultipleSwitchField
          choices={answers.map((answer) => answer.answer)}
          values={answers.map((answer) => answer.id)}
          name={`results[${question.id}]`}
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
