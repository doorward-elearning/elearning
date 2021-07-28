import React from 'react';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import Checkbox from '@doorward/ui/components/Input/Checkbox';
import IfElse from '@doorward/ui/components/IfElse';
import NumberField from '@doorward/ui/components/Input/NumberField';
import DateInput from '@doorward/ui/components/Input/DateInput';
import Row from '@doorward/ui/components/Row';
import { FormContext } from '@doorward/ui/components/Form';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import translate from '@doorward/common/lang/translate';
import { AnswerTypes } from '@doorward/common/types/exam';
import Spacer from '@doorward/ui/components/Spacer';

const AssessmentOptions: React.FunctionComponent<AssessmentOptionsProps> = (props): JSX.Element => {
  const hasMultipleChoiceQuestions = (formikProps) => {
    return formikProps?.values?.questions?.find((question) => question.type === AnswerTypes.MULTIPLE_CHOICE);
  };
  return (
    <FormContext.Consumer>
      {({ formikProps }) => (
        <div className="assessment-details">
          <Header size={2} padded>
            {translate('options')}
          </Header>
          <div>
            <Panel noBackground>
              {hasMultipleChoiceQuestions(formikProps) && (
                <Checkbox name="options.shuffleAnswers" label={translate('shuffleAnswers')} />
              )}
              <Checkbox name="options.timeLimit.allow" label={translate('timeLimit')} />
              <IfElse condition={formikProps?.values.options.timeLimit.allow}>
                <NumberField
                  name="options.timeLimit.minutes"
                  label={translate('minutes')}
                  labelPosition="left"
                  min={1}
                />
              </IfElse>
            </Panel>
            
            <Spacer />
            <Panel noBackground>
              <Header size={3}>{translate('responses')}</Header>
              <Checkbox name="options.responses.show" label={translate('letStudentsSeeResponses')} />
            </Panel>
            <Spacer />
            <Panel noBackground>
              <Header size={3}>{translate('availability')}</Header>
              <Row>
                <DateInput
                  name="options.availability.from"
                  shortDate
                  label={translate('availableFrom')}
                  minDate={new Date()}
                  showTimeSelect
                />
                <DateInput
                  name="options.availability.to"
                  shortDate
                  label={translate('availableTo')}
                  minDate={formikProps.values?.options?.availability?.from || new Date()}
                  showTimeSelect
                />
              </Row>
            </Panel>
          </div>
        </div>
      )}
    </FormContext.Consumer>
  );
};

export interface AssessmentOptionsProps {
  type: AssessmentTypes;
  hasSections?: boolean;
}

export default AssessmentOptions;
