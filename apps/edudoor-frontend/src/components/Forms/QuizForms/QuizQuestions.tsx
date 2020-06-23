import React, { MouseEventHandler } from 'react';
import _ from 'lodash';
import { FieldArray } from 'formik';
import Button from '@edudoor/ui/components/Buttons/Button';
import ItemArray from '@edudoor/ui/components/ItemArray';
import DraftTextArea from '@edudoor/ui/components/Input/DraftTextArea';
import Header from '@edudoor/ui/components/Header';
import Panel from '@edudoor/ui/components/Panel';
import Icon from '@edudoor/ui/components/Icon';
import Checkbox from '@edudoor/ui/components/Input/Checkbox';
import Row from '@edudoor/ui/components/Row';
import TextArea from '@edudoor/ui/components/Input/TextArea';
import { FormContext } from '@edudoor/ui/components/Form';
import NumberField from '@edudoor/ui/components/Input/NumberField';
import { Question } from '@edudoor/common/models/Question';
import { Answer } from '@edudoor/common/models/Answer';

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

const AnswerInput: React.FunctionComponent<AnswerInputProps> = React.memo(
  ({ questionIndex, answerIndex, onRemove }) => {
    return (
      <div className="answer-panel">
        <div className="answer-panel__header">
          <Checkbox
            name={`content.questions[${questionIndex}].answers[${answerIndex}].correct`}
            label=""
            title="Is it a correct Answer?"
          />
          <span>Answer {answerIndex + 1}</span>
          <Icon icon="delete" className="delete-answer" onClick={onRemove} />
        </div>
        <TextArea name={`content.questions[${questionIndex}].answers[${answerIndex}].answer`} />
      </div>
    );
  },
  () => true
);

const AnswersPanel: React.FunctionComponent<AnswersPanelProps> = React.memo(
  props => {
    return (
      <Panel noBackground className="answers-container">
        <FieldArray name={`content.questions[${props.index}].answers`}>
          {arrayHelpers => {
            return (
              <React.Fragment>
                {props.answers.map((answer, index) => {
                  return (
                    <AnswerInput
                      key={index}
                      onRemove={() => arrayHelpers.remove(index)}
                      answerIndex={index}
                      questionIndex={props.index}
                    />
                  );
                })}
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
  },
  (prevProps, nextProps) => prevProps.answers.length === nextProps.answers.length
);

const QuizQuestions: React.FunctionComponent<QuizQuestionsProps> = props => {
  console.log('Rendering...');
  return (
    <FormContext.Consumer>
      {({ formikProps }) => (
        <div className="quiz-questions">
          <FieldArray name="content.questions">
            {arrayHelpers => (
              <React.Fragment>
                {formikProps?.values?.content?.questions.map((question, index) => (
                  <Panel key={question.id}>
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
                    <DraftTextArea fluid name={`content.questions[${index}].question`} label="Question description" />
                    <Header size={3}>Answers</Header>
                    <AnswersPanel answers={question.answers} index={index} />
                  </Panel>
                ))}
                <Panel>
                  <Button type="button" onClick={() => arrayHelpers.push(defaultQuestion)}>
                    Add Question
                  </Button>
                </Panel>
              </React.Fragment>
            )}
          </FieldArray>
        </div>
      )}
    </FormContext.Consumer>
  );
};

export interface QuizQuestionsProps {}

export interface AnswerInputProps {
  questionIndex: number;
  answerIndex: number;
  onRemove: MouseEventHandler;
}

export interface AnswersPanelProps {
  answers: Array<Answer>;
  index: number;
}

export default React.memo(QuizQuestions, () => true);
