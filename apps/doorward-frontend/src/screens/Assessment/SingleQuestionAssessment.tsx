import React, { useContext, useEffect, useState } from 'react';
import './styles/SingleQuestionAssessment.scss';
import TabLayout from '@doorward/ui/components/TabLayout';
import QuestionView, { QuestionViewTypes } from '../../components/UI/AssessmentView/QuestionView';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import QuestionEntity from '@doorward/common/entities/question.entity';
import Button from '@doorward/ui/components/Buttons/Button';
import Row from '@doorward/ui/components/Row';
import Spacer from '@doorward/ui/components/Spacer';
import { FormContext } from '@doorward/ui/components/Form';
import ConfirmModal from '@doorward/ui/components/ConfirmModal';
import useModal from '@doorward/ui/hooks/useModal';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import translate from '@doorward/common/lang/translate';
import { WebComponentState } from 'use-api-action/types/types';
import { AssessmentSubmissionResponse } from '@doorward/common/dtos/response';
import Icon from '@doorward/ui/components/Icon';
import Badge from '@doorward/ui/components/Badge';

const SingleQuestionAssessment: React.FunctionComponent<SingleQuestionAssessmentProps> = ({
  questions,
  onReadyToSave,
  startQuestion,
  onFinishAssessment,
  savingState,
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
    <div className="ed-single-question-assessment">
      <ConfirmModal
        onConfirm={() => {
          onFinishAssessment(JSON.stringify(formikProps.values.submission));
        }}
        useModal={confirmModal}
        title={`Submit ${props.type}`}
      >
        <p>{translate('areYouSureYouWantToSubmitThisAssessment')}</p>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Row style={{ justifyContent: 'start', justifyItems: 'start' }}>
          <Button
            theme="secondary"
            type="button"
            disabled={displayedQuestion === 0}
            onClick={() => setDisplayedQuestion(displayedQuestion - 1)}
          >
            {translate('previous')}
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
            {currentQuestion === questions.length - 1 ? translate('submit') : translate('next')}
          </Button>
        </Row>
        {savingState.data && (
          <div className="saving-status">
            {savingState.submitting ? (
              <span>{translate('savingStatus')}</span>
            ) : (
              <div className="saving-status__saved">
                <Icon icon="check" />
                <span className="ml-4">{translate('saved')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export interface SingleQuestionAssessmentProps {
  questions: Array<QuestionEntity>;
  onReadyToSave: (submission: string) => void;
  startQuestion?: number;
  type: AssessmentTypes;
  onFinishAssessment: (submission: string) => void;
  savingState: WebComponentState<AssessmentSubmissionResponse>;
}

export default SingleQuestionAssessment;
