import React, { useEffect, useState } from 'react';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import moment from 'moment';
import Empty from '@doorward/ui/components/Empty';
import SingleQuestionAssessment from './SingleQuestionAssessment';
import AssessmentTimer from './AssessmentTimer';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';
import _ from 'lodash';
import Form from '@doorward/ui/components/Form';
import useForm from '@doorward/ui/hooks/useForm';

const StartAssessment: React.FunctionComponent<StartAssessmentProps> = ({ assessment }): JSX.Element => {
  const [questions, setQuestions] = useState([]);
  const form = useForm();

  useEffect(() => {
    if (assessment.questions) {
      if (assessment.options?.shuffleAnswers) {
        setQuestions(_.shuffle(assessment.questions));
      } else {
        setQuestions(assessment.questions);
      }
    }
  }, [assessment]);

  return (
    <div>
      {assessment?.options?.timeLimit?.minutes > 0 && (
        <HeaderGrid>
          <DisplayLabel>Points: {assessment.questions.reduce((acc, cur) => acc + cur.points, 0)}</DisplayLabel>
          <AssessmentTimer totalTimeMinutes={assessment.options.timeLimit.minutes} />
        </HeaderGrid>
      )}
      <Form
        form={form}
        initialValues={{
          results: {},
        }}
        onSubmit={() => {}}
      >
        <SingleQuestionAssessment questions={questions} />
      </Form>
    </div>
  );
};

export interface StartAssessmentProps {
  assessment: AssessmentEntity;
}

const AssessmentPage: React.FunctionComponent<AssessmentPageProps> = (props): JSX.Element => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const availability = props.assessment?.options?.availability;
    const startDate = moment(availability?.from || new Date());
    const endDate = availability?.to && moment(availability.to);

    if (startDate.isSameOrBefore(moment())) {
      setIsAvailable(!endDate || endDate.isSameOrAfter(moment()));
    } else {
      setIsAvailable(true);
    }
  }, [props.assessment]);

  return (
    <div>
      {isAvailable ? (
        <StartAssessment assessment={props.assessment} />
      ) : (
        <Empty message={`This ${props.assessment.assessmentType} is not available`} icon="assessment" />
      )}
    </div>
  );
};

export interface AssessmentPageProps {
  assessment: AssessmentEntity;
}

export default AssessmentPage;
