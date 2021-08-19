import Button from '@doorward/ui/components/Buttons/Button';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './styles/SidePanel.scss';
import { connect } from 'react-redux';
import Icon from '@doorward/ui/components/Icon';
import SingleSectionAssessment from './SingleSectionAssessment';
import Row from '@doorward/ui/components/Row';
import Badge from '@doorward/ui/components/Badge';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import { WebComponentState } from '@doorward/api-actions/types';
import { AssessmentSubmissionResponse } from '@doorward/common/dtos/response/assessment.responses';
import Grid from '@doorward/ui/components/Grid';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { CreateQuestionBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import _ from 'lodash';
import { FormikContext, FormikProps } from 'formik';
import { FormContext } from '@doorward/ui/components/Form';

const SidePanel: React.FunctionComponent<SidePanelProps> = ({ section }) => {
  const [index, setIndex] = useState(0);
  const { formikProps } = useContext(FormContext);

  const getQuestionsAnswered = useCallback(
    (section: QuestionSectionEntity) => {
      const result = [];
      section.questions.forEach((question) => {
        if (Object.keys(_.pickBy(formikProps.values.submission, _.identity)).includes(question.id)) {
          result.push(question.id);
        }
      });
      return result;
    },
    [formikProps.values]
  );

  return (
    <div className="question-list-wrapper">
      <div className="question-list-inner">
        <Grid columns="4">
          {section.questions.map((question, index) => {
            const questionsAnswered = getQuestionsAnswered(section);
            if (questionsAnswered.includes(question.id)) {
              return <Button theme="success">{index + 1}</Button>;
            } else return <Button theme="danger">{index + 1}</Button>;
          })}
        </Grid>
      </div>
    </div>
  );
};

export interface SidePanelProps {
  section: QuestionSectionEntity;
}

export default SidePanel;
