import React, { FunctionComponent } from 'react';
import AddModuleItemForm from '../AddModuleItemForm';
import useForm from '@doorward/ui/hooks/useForm';
import './AssessmentDetailsForm.scss';
import AssessmentDetails from './AssessmentDetails';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { CreateAssessmentBody } from '@doorward/common/dtos/body';
import AssessmentOptions from './AssessmentOptions';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import translate from '@doorward/common/lang/translate';
import { ScoreToKeep } from '@doorward/common/types/assessments';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';

const defaultAssessment = (type: AssessmentTypes, title?: string) => ({
  title: title || translate('unnamedItem', { item: type }),
  instructions: '',
  type: ModuleItemType.ASSESSMENT,
  assessmentType: type,
  order: 0,
  options: {
    shuffleAnswers: false,
    timeLimit: {
      allow: false,
      minutes: null,
    },
    attempts: {
      multiple: false,
      keepScore: ScoreToKeep.HIGHEST,
      max: null,
    },
    questions: {
      oneAtATime: true,
      lockAfterAnswering: true,
    },
    restrictions: {
      accessCode: {
        require: false,
        code: null,
      },
    },
    responses: {
      show: true,
      frequency: {
        onlyOnce: false,
        range: {
          allow: false,
          from: null,
          to: null,
        },
      },
    },
    availability: {
      from: new Date(),
      to: null,
    },
  },
  sections: [],
});

const CreateAssessmentForm: FunctionComponent<CreateAssessmentFormProps> = (props): JSX.Element => {
  const initialValues = (props.assessment || defaultAssessment(props.type)) as CreateAssessmentBody;

  const form = useForm<CreateAssessmentFormState>();
  return (
    <div className="create-assessment-form">
      <AddModuleItemForm
        onSuccess={props.onSuccess}
        onCancel={props.onCancel}
        type={ModuleItemType.ASSESSMENT}
        form={form}
        item={props.assessment}
        validationSchema={CreateAssessmentBody}
        module={props.module}
        initialValues={initialValues}
      >
        {() => (
          <div className="assessment-details-form">
            <TabLayout>
              <Tab title={translate('questions')}>
                <AssessmentDetails hasSections={props.hasSections} type={props.type} editing={!!props.assessment} />
              </Tab>
              <Tab title={translate('options')}>
                <AssessmentOptions hasSections={props.hasSections} type={props.type} />
              </Tab>
            </TabLayout>
          </div>
        )}
      </AddModuleItemForm>
    </div>
  );
};

export interface CreateAssessmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  module: ModuleEntity;
  type: AssessmentTypes;
  assessment?: AssessmentEntity;
  hasSections?: boolean;
}

export type CreateAssessmentFormState = CreateAssessmentBody;

export default CreateAssessmentForm;
