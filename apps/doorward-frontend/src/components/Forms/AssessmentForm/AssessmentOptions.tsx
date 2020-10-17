import React from 'react';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import Checkbox from '@doorward/ui/components/Input/Checkbox';
import IfElse from '@doorward/ui/components/IfElse';
import NumberField from '@doorward/ui/components/Input/NumberField';
import DropdownSelect from '@doorward/ui/components/Input/DropdownSelect';
import TextField from '@doorward/ui/components/Input/TextField';
import DateInput from '@doorward/ui/components/Input/DateInput';
import Row from '@doorward/ui/components/Row';
import { FormContext } from '@doorward/ui/components/Form';

const AssessmentOptions: React.FunctionComponent<QuizOptionsProps> = (props): JSX.Element => {
  return (
    <FormContext.Consumer>
      {({ formikProps }) => (
        <div className="quiz-details">
          <Header size={2}>Options </Header>
          <div>
            <Panel noBackground>
              <Checkbox name="options.shuffleAnswers" label="Shuffle Answers" />
              <Checkbox name="options.timeLimit.allow" label="Time Limit" />
              <IfElse condition={formikProps?.values.options.timeLimit.allow}>
                <NumberField name="options.timeLimit.minutes" label="Minutes" labelPosition="left" min={1} />
              </IfElse>
            </Panel>
            <Panel noBackground>
              <Header size={3}>Questions</Header>
              <Checkbox name="options.questions.oneAtATime" label="Show one question at a time" />
              <IfElse condition={formikProps?.values.options.questions.oneAtATime}>
                <Checkbox name="options.questions.lockAfterAnswering" label="Lock questions after answering" />
              </IfElse>
            </Panel>
            <Panel noBackground>
              <Header size={3}>Attempts</Header>
              <Checkbox name="options.attempts.multiple" label="Allow multiple attempts" />
              <IfElse condition={formikProps?.values.options.attempts.multiple}>
                <React.Fragment>
                  <DropdownSelect
                    options={['Highest', 'Average', 'Latest']}
                    label="Quiz score to keep"
                    name="options.attempts.keepScore"
                    icon="timelapse"
                  />
                  <NumberField name="options.attempts.max" label="Allowed attempts" min={1} />
                </React.Fragment>
              </IfElse>
            </Panel>
            <Panel noBackground>
              <Header size={3}>Access</Header>
              <Checkbox name="options.restrictions.accessCode.require" label="Require an access code" />
              <IfElse condition={formikProps?.values.options.restrictions.accessCode.require}>
                <TextField name="options.restrictions.accessCode.code" label="Access code" />
              </IfElse>
            </Panel>
            <Panel noBackground>
              <Header size={3}>Responses</Header>
              <Checkbox name="options.responses.show" label="Let students see their quiz responses." />
              <IfElse condition={formikProps?.values.options.responses.show}>
                <React.Fragment>
                  <Checkbox name="options.responses.frequency.onlyOnce" label="Only once after each attempt" />
                  <Checkbox
                    name="options.responses.frequency.range.allow"
                    label="Let students see the correct answers"
                  />
                  <IfElse condition={formikProps?.values.options.responses.frequency.range.allow}>
                    <React.Fragment>
                      <DateInput
                        name="options.responses.frequency.range.from"
                        showTimeSelect
                        label="Show correct answers at"
                      />
                      <DateInput
                        name="options.responses.frequency.range.to"
                        showTimeSelect
                        label="Hide correct answers at"
                      />
                    </React.Fragment>
                  </IfElse>
                </React.Fragment>
              </IfElse>
            </Panel>
            <Panel noBackground>
              <Header size={3}>Availability</Header>
              <DateInput name="options.dueDate" label="Due date" minDate={new Date()} showTimeSelect />
              <Row>
                <DateInput
                  name="options.availability.from"
                  shortDate
                  label="Available from"
                  minDate={new Date()}
                  showTimeSelect
                />
                <DateInput
                  name="options.availability.to"
                  shortDate
                  label="Available until"
                  minDate={new Date()}
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

export interface QuizOptionsProps {}

export default AssessmentOptions;
