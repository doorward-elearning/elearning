import React, { MouseEventHandler, useEffect } from 'react';
import _ from 'lodash';
import { FieldArray } from 'formik';
import Button from '@doorward/ui/components/Buttons/Button';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import Header from '@doorward/ui/components/Header';
import Panel from '@doorward/ui/components/Panel';
import Icon from '@doorward/ui/components/Icon';
import Checkbox from '@doorward/ui/components/Input/Checkbox';
import TextArea from '@doorward/ui/components/Input/TextArea';
import NumberField from '@doorward/ui/components/Input/NumberField';
import { CreateAnswerBody, CreateQuestionBody, CreateQuizBody } from '@doorward/common/dtos/body';
import ErrorMessage from '@doorward/ui/components/Input/ErrorMessage';
import Modal, { ModalFeatures } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import Form from '@doorward/ui/components/Form';
import useForm from '@doorward/ui/hooks/useForm';
import './AddQuizQuestionModal.scss';

export const defaultQuestion: CreateQuestionBody = {
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

const AnswerInput: React.FunctionComponent<AnswerInputProps> = ({ answerIndex, onRemove }) => {
  return (
    <div className="answer-panel">
      <div className="answer-panel__header">
        <Checkbox name={`answers[${answerIndex}].correct`} label="" title="Is it a correct Answer?" />
        <span>Answer {answerIndex + 1}</span>
        <Icon icon="delete" className="delete-answer" onClick={onRemove} />
      </div>
      <TextArea name={`answers[${answerIndex}].answer`} />
    </div>
  );
};

const AnswersPanel: React.FunctionComponent<AnswersPanelProps> = React.memo((props) => {
  return (
    <Panel noBackground className="answers-container">
      <FieldArray name={`answers`}>
        {(arrayHelpers) => (
          <React.Fragment>
            {props.answers.map((answer, index) => (
              <AnswerInput key={index} onRemove={() => arrayHelpers.remove(index)} answerIndex={index} />
            ))}
            <Button
              type="button"
              theme="accent"
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
});

const AddQuizQuestionModal: React.FunctionComponent<QuizQuestionsProps> = ({ useModal, onAddQuestion, question }) => {
  const form = useForm();
  useEffect(() => {
    if (question) {
      useModal.openModal();
    }
  }, [question]);
  return (
    <Form
      initialValues={defaultQuestion}
      form={form}
      resetOnSubmit
      onSubmit={(values) => {
        useModal.closeModal();
        onAddQuestion(values);
      }}
      validationSchema={CreateQuizBody.QuestionValidationSchema}
    >
      {({ values: question, isValid, submitForm }) => {
        return (
          <Modal
            useModal={useModal}
            features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.NEGATIVE_BUTTON]}
            bottomSheet
          >
            <Modal.Header title="Add Question" />
            <Modal.Body>
              <div className="quiz-questions">
                <div className="quiz-questions__question">
                  <NumberField name={`points`} min={1} label="Points" />
                  <DraftTextArea fluid name={`question`} label="Question description" />
                </div>
                <div className="quiz-questions__answers">
                  <Header size={3}>Answers</Header>
                  <ErrorMessage name={`answers`} />
                  <AnswersPanel answers={question.answers} />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer
              onPositiveClick={submitForm}
              onNegativeClick={useModal.closeModal}
              props={{
                positive: { disabled: !isValid },
              }}
              buttons={{ positive: 'Add', negative: 'Cancel' }}
            />
          </Modal>
        );
      }}
    </Form>
  );
};

export interface QuizQuestionsProps {
  useModal: UseModal;
  onAddQuestion: (question: CreateQuestionBody) => void;
  question?: CreateQuestionBody;
}

export interface AnswerInputProps {
  answerIndex: number;
  onRemove: MouseEventHandler;
}

export interface AnswersPanelProps {
  answers: Array<CreateAnswerBody>;
}

export default AddQuizQuestionModal;
