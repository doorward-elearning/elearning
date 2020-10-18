import React, { useContext, useEffect, useState } from 'react';
import TabLayout from '@doorward/ui/components/TabLayout';
import QuestionView, { QuestionViewTypes } from '../../components/UI/AssessmentView/QuestionView';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import QuestionEntity from '@doorward/common/entities/question.entity';
import Button from '@doorward/ui/components/Buttons/Button';
import Row from '@doorward/ui/components/Row';
import Spacer from '@doorward/ui/components/Spacer';
import { FormContext } from '@doorward/ui/components/Form';
import { start } from 'repl';
import ConfirmModal from '@doorward/ui/components/ConfirmModal';
import useModal from '@doorward/ui/hooks/useModal';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';

const SingleQuestionAssessment: React.FunctionComponent<SingleQuestionAssessmentProps> = ({
  questions,
  onReadyToSave,
  startQuestion,
  onFinishAssessment,
  ...props
}): JSX.Element => {
  const [currentQuestion, setCurrentQuestion] = useState(startQuestion || 0);
  const [displayedQuestion, setDisplayedQuestion] = useState(startQuestion || 0);
  const [currentAnswered, setCurrentAnswered] = useState(false);
  const { formikProps } = useContext(FormContext);
  const confirmModal = useModal();

  useEffect(() => {
    setCurrentQuestion(startQuestion);
  }, [startQuestion]);

  useEffect(() => {
    if (formikProps) {
      const question = questions[currentQuestion];

      setCurrentAnswered(!!formikProps.values.submission?.[question?.id]);
    }
  }, [formikProps, currentQuestion]);

  useEffect(() => {
    setDisplayedQuestion(currentQuestion);

    onReadyToSave(JSON.stringify(formikProps.values.submission));
  }, [currentQuestion]);

  return (
    <div>
      <ConfirmModal
        onConfirm={() => {
          onFinishAssessment(JSON.stringify(formikProps.values.submission));
        }}
        useModal={confirmModal}
        title={`Submit ${props.type}`}
      >
        <p>Are you sure you want to submit this {props.type}</p>
      </ConfirmModal>
      <TabLayout
        stickyHeader
        selected={displayedQuestion}
        controlled
        disabled={(tabIndex) => tabIndex > currentQuestion}
        onTabChange={(tab) => {
          if (tab !== displayedQuestion) {
            setDisplayedQuestion(tab);
          }
        }}
      >
        {questions.map((question, index) => (
          <Tab title={`${index + 1}`}>
            <QuestionView question={question} view={QuestionViewTypes.EXAM_MODE} />
          </Tab>
        ))}
      </TabLayout>
      <Spacer />
      <Row style={{ justifyContent: 'start', justifyItems: 'start' }}>
        <Button
          theme="secondary"
          type="button"
          disabled={displayedQuestion === 0}
          onClick={() => setDisplayedQuestion(displayedQuestion - 1)}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (currentQuestion === questions.length - 1) {
              confirmModal.openModal();
            } else {
              if (currentQuestion === displayedQuestion) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                setDisplayedQuestion(displayedQuestion + 1);
              }
            }
          }}
          type="button"
          theme={currentQuestion === questions.length - 1 ? 'success' : 'primary'}
          disabled={!currentAnswered && currentQuestion === displayedQuestion}
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Row>
    </div>
  );
};

export interface SingleQuestionAssessmentProps {
  questions: Array<QuestionEntity>;
  onReadyToSave: (submission: string) => void;
  startQuestion?: number;
  type: AssessmentTypes;
  onFinishAssessment: (submission: string) => void;
}

export default SingleQuestionAssessment;
