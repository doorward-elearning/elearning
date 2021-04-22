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
import { WebComponentState } from 'use-api-action/types/types';
import { AssessmentSubmissionResponse } from '@doorward/common/dtos/response';
import Icon from '@doorward/ui/components/Icon';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';
import Header from '@doorward/ui/components/Header';

const SingleSectionAssessment: React.FunctionComponent<SingleSectionAssessmentProps> = ({
  sections,
  onReadyToSave,
  onFinishAssessment,
  savingState,
  ...props
}): JSX.Element => {
  const { formikProps } = useContext(FormContext);
  const confirmModal = useModal();
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    onReadyToSave(JSON.stringify(formikProps.values.submission));
  }, [formikProps.values]);

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
              <div className="mb-4">
                <Header size={3}>{translate('instructions')}</Header>
                <Spacer size="large" />
                <DisplayLabel className="mt-4">
                  {section.config.questions.allCompulsory ? (
                    <i>{translate('sectionAllQuestionsCompulsory')}</i>
                  ) : (
                    <i>{translate('sectionPleaseChooseQuestions', { count: section.config.questions.numRequired })}</i>
                  )}
                </DisplayLabel>
                <DraftHTMLContent content={section.instructions} />
              </div>
              <div>
                <DisplayLabel>{translate('pointsWithCount', { count: section.points })}</DisplayLabel>
              </div>
            </div>
            {section.questions.map((question) => {
              const questionsAnswered = getQuestionsAnswered(section);
              const disableQuestion =
                !section.config.questions.allCompulsory &&
                questionsAnswered.length === section.config.questions.numRequired &&
                !questionsAnswered.includes(question.id);
              return <QuestionView disabled={disableQuestion} question={question} view={QuestionViewTypes.EXAM_MODE} />;
            })}
            <div>
              <Button type="button" onClick={() => confirmModal.openModal()} theme="success">
                {translate('submit')}
              </Button>
            </div>
          </Tab>
        ))}
      </TabLayout>
      <Spacer />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

export interface SingleSectionAssessmentProps {
  sections: Array<QuestionSectionEntity>;
  onReadyToSave: (submission: string) => void;
  type: AssessmentTypes;
  onFinishAssessment: (submission: string) => void;
  savingState: WebComponentState<AssessmentSubmissionResponse>;
}

export default SingleSectionAssessment;
