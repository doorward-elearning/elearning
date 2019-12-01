import React from 'react';
import _ from 'lodash';
import { FieldArray } from 'formik';
import Button from '../../../ui/Buttons/Button';
import ItemArray from '../../../ui/ItemArray';
import DraftTextArea from '../../../ui/Input/DraftTextArea';
import Header from '../../../ui/Header';
import { Answer, Question } from '../../../../services/models';
import Panel from '../../../ui/Panel';
import Icon from '../../../ui/Icon';
import Checkbox from '../../../ui/Input/Checkbox';
import Row from '../../../ui/Row';
import TextArea from '../../../ui/Input/TextArea';
import { FormContext } from '../../../ui/Form';
import NumberField from '../../../ui/Input/NumberField';

export const defaultQuestion = {
  question: null,
  points: 1,
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
        {arrayHelpers => {
          return (
            <React.Fragment>
              <ItemArray data={props.answers}>
                {(answer, index) => (
                  <div className="answer-panel">
                    <div className="answer-panel__header">
                      <Checkbox
                        name={`content.questions[${props.index}].answers[${index}].correct`}
                        label=""
                        title="Is it a correct Answer?"
                      />
                      <span>Answer {index + 1}</span>
                      <Icon icon="delete" className="delete-answer" onClick={() => arrayHelpers.remove(index)} />
                    </div>
                    <TextArea name={`content.questions[${props.index}].answers[${index}].answer`} />
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
          );
        }}
      </FieldArray>
    </Panel>
  );
};

const QuizQuestions: React.FunctionComponent<QuizQuestionsProps> = props => {
  return (
    <FormContext.Consumer>
      {({ formikProps }) => (
        <div className="quiz-questions">
          <FieldArray name="content.questions">
            {arrayHelpers => {
              return (
                <React.Fragment>
                  <ItemArray data={formikProps?.values.content.questions}>
                    {(question: Question, index) => (
                      <Panel>
                        <Row style={{ gridTemplateColumns: 'auto 1fr auto', gridColumnGap: 'var(--padding-lg)' }}>
                          <Header size={3}>Question {index + 1}</Header>
                          <NumberField
                            name={`content.questions[${index}].points`}
                            min={1}
                            labelPosition="right"
                            label="Points"
                          />
                          <Icon icon="delete" onClick={() => arrayHelpers.remove(index)} />
                        </Row>
                        <DraftTextArea
                          fluid
                          name={`content.questions[${index}].question`}
                          label="Question description"
                        />
                        <Header size={3}>Answers</Header>
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
      )}
    </FormContext.Consumer>
  );
};

export interface QuizQuestionsProps {}

export interface AnswersPanelProps {
  answers: Array<Answer>;
  index: number;
}

export default QuizQuestions;
