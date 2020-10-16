import React, { useEffect, useState } from 'react';
import AnswerEntity from '@doorward/common/entities/answer.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { CreateAnswerBody, CreateQuestionBody } from '@doorward/common/dtos/body';
import List from '@doorward/ui/components/List';
import ListItem from '@doorward/ui/components/List/ListItem';
import Row from '@doorward/ui/components/Row';
import Switch from '@doorward/ui/components/Switch';
import { QuestionViewTypes } from './QuestionView';

const AnswersView: React.FunctionComponent<AnswersViewProps> = ({ question, answers, view }) => {
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (view === QuestionViewTypes.ANSWER_ONLY) {
      setEditable(false);
    }
  }, [view]);

  return (
    <div className="answers-view">
      <List>
        {answers.map((answer) => {
          return (
            <ListItem>
              <Row style={{ justifyContent: 'start', gridGap: 'var(--padding-lg)' }}>
                <Switch open={answer.correct} onToggle={(open) => {}} disabled={!editable} />
                <span>{answer.answer}</span>
              </Row>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export interface AnswersViewProps {
  answers: Array<AnswerEntity | CreateAnswerBody>;
  question: QuestionEntity | CreateQuestionBody;
  view?: QuestionViewTypes;
}

export default AnswersView;
