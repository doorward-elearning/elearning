import React, { useContext, useEffect, useState } from 'react';
import TabLayout from '@doorward/ui/components/TabLayout';
import QuestionView, { QuestionViewTypes } from '../../components/UI/AssessmentView/QuestionView';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import QuestionEntity from '@doorward/common/entities/question.entity';
import Button from '@doorward/ui/components/Buttons/Button';
import Row from '@doorward/ui/components/Row';
import Spacer from '@doorward/ui/components/Spacer';
import { FormContext } from '@doorward/ui/components/Form';

const SingleQuestionAssessment: React.FunctionComponent<SingleQuestionAssessmentProps> = ({
  questions,
}): JSX.Element => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [displayedQuestion, setDisplayedQuestion] = useState(0);
  const [currentAnswered, setCurrentAnswered] = useState(false);
  const { formikProps } = useContext(FormContext);

  useEffect(() => {
    if (formikProps) {
      const question = questions[currentQuestion];

      setCurrentAnswered(!!formikProps.values.results?.[question?.id]);
    }
  }, [formikProps, currentQuestion]);

  useEffect(() => {
    setDisplayedQuestion(currentQuestion);
  }, [currentQuestion]);

  return (
    <div>
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
            if (currentQuestion === displayedQuestion) {
              setCurrentQuestion(currentQuestion + 1);
            } else {
              setDisplayedQuestion(displayedQuestion + 1);
            }
          }}
          type="button"
          disabled={!currentAnswered && currentQuestion === displayedQuestion}
        >
          Next
        </Button>
      </Row>
    </div>
  );
};

export interface SingleQuestionAssessmentProps {
  questions: Array<QuestionEntity>;
}

export default SingleQuestionAssessment;
