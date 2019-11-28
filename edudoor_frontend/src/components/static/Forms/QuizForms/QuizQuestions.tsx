import React from 'react';
import _ from 'lodash';
import { UseForm } from '../../../../hooks/useForm';
import { CreateQuizFormState } from './CreateQuizForm';
import { FieldArray } from 'formik';
import Button from '../../../ui/Buttons/Button';
import ItemArray from '../../../ui/ItemArray';
import DraftTextArea from '../../../ui/Input/DraftTextArea';
import Header from '../../../ui/Header';
import { Answer, Question } from '../../../../services/models';
import TextField from '../../../ui/Input/TextField';
import Accordion from '../../../ui/Accordion';
import Panel from '../../../ui/Panel';
import Icon from '../../../ui/Icon';
import Checkbox from '../../../ui/Input/Checkbox';
import Row from '../../../ui/Row';

export const defaultQuestion = {
  question: null,
  answers: _.times(
    4,
    _.constant({
      answer: '',
      description: null,
      correct: false,
    })
  ),
};

const AnswersPanel: React.FunctionComponent<AnswersPanelProps> = props => {
  return (
    <Panel noBackground className="answers-container">
      <FieldArray name={`content.questions[${props.index}].answers`}>
        {arrayHelpers => (
          <React.Fragment>
            <ItemArray data={props.answers}>
              {(answer, index) => (
                <div className="answer-panel">
                  <Checkbox
                    name={`content.questions[${props.index}].answers[${index}].correct`}
                    label=""
                    title="Correct Answer"
                  />
                  <TextField
                    name={`content.questions[${props.index}].answers[${index}].answer`}
                    label={`Answer ${index + 1}`}
                    labelPosition="left"
                  />
                  <Icon icon="delete" onClick={() => arrayHelpers.remove(index)} />
                </div>
              )}
            </ItemArray>
            <Button
              type="button"
              theme="secondary"
              onClick={() =>
                arrayHelpers.push({
                  answer: '',
                  description: null,
                  correct: false,
                })
              }
            >
              Add Answer
            </Button>
          </React.Fragment>
        )}
      </FieldArray>
    </Panel>
  );
};

const QuizQuestions: React.FunctionComponent<QuizQuestionsProps> = ({ form: { formikProps } }) => {
  return (
    <div className="quiz-questions">
      <FieldArray name="content.questions">
        {arrayHelpers => {
          return (
            <React.Fragment>
              <ItemArray data={formikProps?.values.content.questions}>
                {(question: Question, index) => (
                  <Panel noBackground>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <Header size={3}>Question {index + 1}</Header>
                      <Icon icon="delete" onClick={() => arrayHelpers.remove(index)} />
                    </Row>
                    <DraftTextArea fluid name={`content.questions[${index}].question`} label="Question description" />
                    <AnswersPanel answers={question.answers} index={index} />
                  </Panel>
                )}
              </ItemArray>
              <Panel>
                <Button type="button" onClick={() => arrayHelpers.push(defaultQuestion)}>
                  Add Question
                </Button>
              </Panel>
            </React.Fragment>
          );
        }}
      </FieldArray>
    </div>
  );
};

export interface QuizQuestionsProps {
  form: UseForm<CreateQuizFormState>;
}

export interface AnswersPanelProps {
  answers: Array<Answer>;
  index: number;
}

export default QuizQuestions;
