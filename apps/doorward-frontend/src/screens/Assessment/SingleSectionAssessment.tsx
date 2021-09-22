import React, { useCallback, useContext, useEffect, useState } from 'react';
import './styles/SingleQuestionAssessment.scss';
import _ from 'lodash';
import TabLayout from '@doorward/ui/components/TabLayout';
import QuestionView, { QuestionViewTypes } from '../../components/UI/AssessmentView/QuestionView';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import Button from '@doorward/ui/components/Buttons/Button';
import Spacer from '@doorward/ui/components/Spacer';
import { FormContext } from '@doorward/ui/components/Form';
import ConfirmModal from '@doorward/ui/components/ConfirmModal';
import useModal from '@doorward/ui/hooks/useModal';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import translate from '@doorward/common/lang/translate';
import { WebComponentState } from '@doorward/api-actions/types';
import { AssessmentSubmissionResponse } from '@doorward/common/dtos/response';
import Icon from '@doorward/ui/components/Icon';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';
import HTMLContentView from '@doorward/ui/components/HTMLContentView';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';
import Header from '@doorward/ui/components/Header';
import { Draggable } from 'react-beautiful-dnd';
import { ColumnSizer } from 'react-virtualized';
import DisplayQuestion from './DisplayQuestion';

const SingleSectionAssessment: React.FunctionComponent<SingleSectionAssessmentProps> = ({
  sections,
  onReadyToSave,
  ...props
}): JSX.Element => {
  const { formikProps } = useContext(FormContext);
  const confirmModal = useModal();
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    onReadyToSave(JSON.stringify(formikProps.values.submission));
  }, [formikProps.values]);
  const setPoints = useCallback(
    (section: QuestionSectionEntity) => {
      if (section.config.questions.allCompulsory) {
        return section.points;
      } else {
        const required = section.config.questions.numRequired;
        const totalQuestions = section.questions.length;
        const pointsForEach = Math.round(section.points / totalQuestions);
        return pointsForEach * required;
      }
    },
    [formikProps.values]
  );

  return (
    <div className="ed-single-question-assessment">
      <TabLayout
        stickyHeader
        selected={currentSection}
        controlled
        onTabChange={(tab) => {
          if (tab !== currentSection) {
            setCurrentSection(tab);
          }
        }}
      >
        {sections.map((section, index) => (
          <Tab title={translate('sectionHeader', { index: section.order + 1 })}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
              <Header size={3}>{translate('instructions')}</Header>
              <DisplayLabel>{translate('pointsWithCount', { count: setPoints(section) })}</DisplayLabel>
            </div>
            <div className="mb-4 mt-8">
              {!section.config.questions.answers?.answerAll && (
                <DisplayLabel className="mt-4 mb-4">
                  {section.config.questions.allCompulsory ? (
                    <i>{translate('sectionAllQuestionsCompulsory')}</i>
                  ) : (
                    <i>{translate('sectionPleaseChooseQuestions', { count: section.config.questions.numRequired })}</i>
                  )}
                </DisplayLabel>
              )}
              <HTMLContentView content={section.instructions} />
            </div>
            <div>
              <DisplayQuestion view={QuestionViewTypes.EXAM_MODE} section={section} />
            </div>
          </Tab>
        ))}
      </TabLayout>
      <Spacer />
    </div>
  );
};

export interface SingleSectionAssessmentProps {
  sections: Array<QuestionSectionEntity>;
  type: AssessmentTypes;
  onReadyToSave: (submission: string) => void;
}

export default SingleSectionAssessment;
