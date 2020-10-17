import React, { MouseEventHandler, useEffect } from 'react';
import _ from 'lodash';
import { ArrayHelpers, FieldArray } from 'formik';
import Button from '@doorward/ui/components/Buttons/Button';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import Header from '@doorward/ui/components/Header';
import Panel from '@doorward/ui/components/Panel';
import Icon from '@doorward/ui/components/Icon';
import Checkbox from '@doorward/ui/components/Input/Checkbox';
import TextArea from '@doorward/ui/components/Input/TextArea';
import NumberField from '@doorward/ui/components/Input/NumberField';
import { CreateAnswerBody, CreateQuestionBody, CreateAssessmentBody } from '@doorward/common/dtos/body';
import ErrorMessage from '@doorward/ui/components/Input/ErrorMessage';
import Modal, { ModalFeatures } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import Form from '@doorward/ui/components/Form';
import useForm from '@doorward/ui/hooks/useForm';
import './AddAssessmentQuestionModal.scss';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';

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
      <React.Fragment>
        {props.answers.map((answer, index) => (
          <AnswerInput key={index} onRemove={() => props.arrayHelpers.remove(index)} answerIndex={index} />
        ))}
      </React.Fragment>
    </Panel>
  );
});

const AddQuestionModal: React.FunctionComponent<AssessmentQuestionsProps> = ({
  useModal,
  onAddQuestion,
  question: editQuestion,
}) => {
  const form = useForm();
  useEffect(() => {
    if (editQuestion) {
      useModal.openModal();
    }
  }, [editQuestion]);

  return (
    <Form
      initialValues={editQuestion || defaultQuestion}
      form={form}
      resetOnSubmit
      onSubmit={(values) => {
        useModal.closeModal();
        onAddQuestion(values);
      }}
      validationSchema={CreateAssessmentBody.QuestionValidationSchema}
    >
      {({ values: question, isValid, submitForm }) => {
        return (
          <Modal
            useModal={useModal}
            features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.NEGATIVE_BUTTON]}
            bottomSheet
          >
            <Modal.Header title={editQuestion ? 'Edit question' : 'Add question'} />
            <Modal.Body>
              <div className="assessment-questions">
                <div className="assessment-questions__question">
                  <NumberField name={`points`} min={1} label="Points" />
                  <DraftTextArea fluid name={`question`} label="Question description" />
                </div>
                <div className="assessment-questions__answers">
                  <FieldArray name={`answers`}>
                    {(arrayHelpers) => (
                      <React.Fragment>
                        <HeaderGrid>
                          <Header size={2}>Answers</Header>
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
                        </HeaderGrid>
                        <ErrorMessage name={`answers`} />
                        <AnswersPanel answers={question.answers} arrayHelpers={arrayHelpers} />
                      </React.Fragment>
                    )}
                  </FieldArray>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer
              onPositiveClick={submitForm}
              onNegativeClick={useModal.closeModal}
              props={{
                positive: { disabled: !isValid },
              }}
              buttons={{ positive: editQuestion ? 'Edit' : 'Add', negative: 'Cancel' }}
            />
          </Modal>
        );
      }}
    </Form>
  );
};

export interface AssessmentQuestionsProps {
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
  arrayHelpers: ArrayHelpers;
}

export default AddQuestionModal;
