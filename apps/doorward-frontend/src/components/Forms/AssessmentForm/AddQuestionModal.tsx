import React, { MouseEventHandler, useEffect } from 'react';
import _ from 'lodash';
import { ArrayHelpers, FieldArray } from 'formik';
import Button from '@doorward/ui/components/Buttons/Button';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import Header from '@doorward/ui/components/Header';
import Panel from '@doorward/ui/components/Panel';
import Icon from '@doorward/ui/components/Icon';
import NumberField from '@doorward/ui/components/Input/NumberField';
import { CreateAnswerBody, CreateAssessmentBody, CreateQuestionBody } from '@doorward/common/dtos/body';
import ErrorMessage from '@doorward/ui/components/Input/ErrorMessage';
import Modal, { ModalFeatures } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import Form from '@doorward/ui/components/Form';
import useForm from '@doorward/ui/hooks/useForm';
import './AddQuestionModal.scss';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import { AnswerTypes } from '@doorward/common/types/exam';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import DropdownSelect from '@doorward/ui/components/Input/DropdownSelect';
import translate from '@doorward/common/lang/translate';
import Tooltip from '@doorward/ui/components/Tooltip';
import Checkbox from '@doorward/ui/components/Input/Checkbox';

export const defaultAnswer: CreateAnswerBody = {
  answer: '',
  description: null,
  correct: false,
  points: 0,
};

export const defaultQuestion: CreateQuestionBody = {
  question: null,
  points: 1,
  type: AnswerTypes.MULTIPLE_CHOICE,
  answers: _.times(4, _.constant(defaultAnswer)),
};

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AnswerInput: React.FunctionComponent<AnswerInputProps> = ({ answerIndex, onRemove, questionType }) => {
  return (
    <div className="answer-panel">
      <span className="answer-index">{LETTERS[answerIndex]}</span>
      <Panel noBackground>
        <div className="answer-panel__header">
          <div>
            {questionType === AnswerTypes.MULTIPLE_CHOICE && (
              <Tooltip title={translate('isCorrectAnswer')}>
                <Checkbox name={`answers[${answerIndex}].correct`} label="" />
              </Tooltip>
            )}
            {questionType === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE && (
              <NumberField
                min={0}
                name={`answers[${answerIndex}].points`}
                label={translate('points')}
                labelPosition="left"
              />
            )}
          </div>
          <div>
            <Icon icon="delete" title={translate('delete')} className="delete-answer" onClick={onRemove} />
          </div>
        </div>
        <DraftTextArea name={`answers[${answerIndex}].answer`} shy fluid />
      </Panel>
    </div>
  );
};

const AnswersPanel: React.FunctionComponent<AnswersPanelProps> = React.memo((props) => {
  return (
    <div className="answers-container">
      <React.Fragment>
        {props.answers.map((answer, index) => (
          <AnswerInput
            questionType={props.questionType}
            key={index}
            onRemove={() => props.arrayHelpers.remove(index)}
            answerIndex={index}
          />
        ))}
      </React.Fragment>
    </div>
  );
});

const AddQuestionModal: React.FunctionComponent<AssessmentQuestionsProps> = ({
  useModal,
  onAddQuestion,
  question: editQuestion,
  type,
  ...props
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
      validationSchema={CreateAssessmentBody.QuestionValidationSchema()}
    >
      {({ values: question, isValid, submitForm }) => {
        return (
          <Modal
            useModal={useModal}
            features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.NEGATIVE_BUTTON]}
            className="add-question-modal"
          >
            <Modal.Header title={editQuestion ? translate('editQuestion') : translate('addQuestion')} />
            <Modal.Body>
              <div className="assessment-questions">
                <div className="assessment-questions__question">
                  <NumberField
                    name="points"
                    min={1}
                    disabled={question.type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE}
                    label="Points"
                    overrideValue={
                      question.type === AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE &&
                      `${Math.max(...question.answers.map((answer) => +answer.points))}`
                    }
                  />
                  {type === AssessmentTypes.EXAM && (
                    <DropdownSelect
                      name="type"
                      icon="question_answer"
                      options={[
                        {
                          value: AnswerTypes.MULTIPLE_CHOICE,
                          label: translate('multipleChoice'),
                        },
                        {
                          value: AnswerTypes.TEXT_INPUT,
                          label: translate('textInput'),
                        },
                        {
                          value: AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE,
                          label: translate('multipleChoiceDescriptive'),
                        },
                      ]}
                      label={translate('type')}
                    />
                  )}
                  <DraftTextArea fluid name={`question`} label={translate('description')} />
                </div>
                {[AnswerTypes.MULTIPLE_CHOICE_DESCRIPTIVE, AnswerTypes.MULTIPLE_CHOICE].includes(question.type) && (
                  <div className="assessment-questions__answers">
                    <FieldArray name={`answers`}>
                      {(arrayHelpers) => (
                        <React.Fragment>
                          <HeaderGrid>
                            <Header size={2}>Answers</Header>
                            <Button type="button" theme="accent" onClick={() => arrayHelpers.push(defaultAnswer)}>
                              {translate('addAnswer')}
                            </Button>
                          </HeaderGrid>
                          <ErrorMessage name="answers" />
                          <AnswersPanel
                            questionType={question.type}
                            answers={question.answers}
                            arrayHelpers={arrayHelpers}
                          />
                        </React.Fragment>
                      )}
                    </FieldArray>
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer
              onPositiveClick={submitForm}
              onNegativeClick={useModal.closeModal}
              props={{
                positive: { disabled: !isValid },
              }}
              buttons={{ positive: editQuestion ? translate('save') : translate('add'), negative: translate('cancel') }}
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
  type: AssessmentTypes;
}

export interface AnswerInputProps {
  answerIndex: number;
  onRemove: MouseEventHandler;
  questionType: AnswerTypes;
}

export interface AnswersPanelProps {
  answers: Array<CreateAnswerBody>;
  arrayHelpers: ArrayHelpers;
  questionType: AnswerTypes;
}

export default AddQuestionModal;
