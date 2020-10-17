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

const defaultAssessment = (type: AssessmentTypes, title?: string) => ({
  title: title || 'Unnamed',
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
      keepScore: 'Highest',
      max: null,
    },
    questions: {
      oneAtATime: false,
      lockAfterAnswering: false,
    },
    restrictions: {
      accessCode: {
        require: false,
        code: null,
      },
    },
    responses: {
      show: false,
      frequency: {
        onlyOnce: false,
        range: {
          allow: false,
          from: null,
          to: null,
        },
      },
    },
    dueDate: null,
    availability: {
      from: null,
      to: null,
    },
  },
  questions: [],
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
            <AssessmentDetails type={props.type} />
            <AssessmentOptions type={props.type} />
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
}

export type CreateAssessmentFormState = CreateAssessmentBody;

export default CreateAssessmentForm;
