import React from 'react';
import TextField from '../../../../../../libs/ui/components/Input/TextField';
import DraftTextArea from '../../../../../../libs/ui/components/Input/DraftTextArea';
import Panel from '../../../../../../libs/ui/components/Panel';
import Header from '../../../../../../libs/ui/components/Header';
import Checkbox from '../../../../../../libs/ui/components/Input/Checkbox';
import IfElse from '../../../../../../libs/ui/components/IfElse';
import NumberField from '../../../../../../libs/ui/components/Input/NumberField';
import DropdownSelect from '../../../../../../libs/ui/components/Input/DropdownSelect';
import DateInput from '../../../../../../libs/ui/components/Input/DateInput';
import Row from '../../../../../../libs/ui/components/Row';
import { FormContext } from '../../../../../../libs/ui/components/Form';

const QuizDetails: React.FunctionComponent<QuizDetailsProps> = props => {
  return (
    <FormContext.Consumer>
      {({ formikProps }) => (
        <div className="quiz-details-form">
          <TextField name="title" label="Title" placeholder="Title of the Quiz" />
          <DraftTextArea name="content.instructions" label="Instructions" labelPosition="top" fluid />
          <div className="quiz-details">
            <div>
              <Panel noBackground>
                <Header size={3}>Options</Header>
                <Checkbox name="content.options.shuffleAnswers" label="Shuffle Answers" />
                <Checkbox name="content.options.timeLimit.allow" label="Time Limit" />
                <IfElse condition={formikProps?.values.content.options.timeLimit.allow}>
                  <NumberField name="content.options.timeLimit.minutes" label="Minutes" labelPosition="left" min={1} />
                </IfElse>
              </Panel>
              <Panel noBackground>
                <Header size={3}>Questions</Header>
                <Checkbox name="content.options.questions.oneAtATime" label="Show one question at a time" />
                <IfElse condition={formikProps?.values.content.options.questions.oneAtATime}>
                  <Checkbox
                    name="content.options.questions.lockAfterAnswering"
                    label="Lock questions after answering"
                  />
                </IfElse>
              </Panel>
              <Panel noBackground>
                <Header size={3}>Attempts</Header>
                <Checkbox name="content.options.attempts.multiple" label="Allow multiple attempts" />
                <IfElse condition={formikProps?.values.content.options.attempts.multiple}>
                  <React.Fragment>
                    <DropdownSelect
                      options={['Highest', 'Average', 'Latest']}
                      label="Quiz score to keep"
                      name="content.options.attempts.keepScore"
                      icon="timelapse"
                    />
                    <NumberField name="content.options.attempts.max" label="Allowed attempts" min={1} />
                  </React.Fragment>
                </IfElse>
              </Panel>
              <Panel noBackground>
                <Header size={3}>Access</Header>
                <Checkbox name="content.options.restrictions.accessCode.require" label="Require an access code" />
                <IfElse condition={formikProps?.values.content.options.restrictions.accessCode.require}>
                  <TextField name="content.options.restrictions.accessCode.code" label="Access code" />
                </IfElse>
              </Panel>
              <Panel noBackground>
                <Header size={3}>Responses</Header>
                <Checkbox name="content.options.responses.show" label="Let students see their quiz responses." />
                <IfElse condition={formikProps?.values.content.options.responses.show}>
                  <React.Fragment>
                    <Checkbox
                      name="content.options.responses.frequency.onlyOnce"
                      label="Only once after each attempt"
                    />
                    <Checkbox
                      name="content.options.responses.frequency.range.allow"
                      label="Let students see the correct answers"
                    />
                    <IfElse condition={formikProps?.values.content.options.responses.frequency.range.allow}>
                      <React.Fragment>
                        <DateInput
                          name="content.options.responses.frequency.range.from"
                          showTimeSelect
                          label="Show correct answers at"
                        />
                        <DateInput
                          name="content.options.responses.frequency.range.to"
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
                <DateInput name="content.options.dueDate" label="Due date" minDate={new Date()} showTimeSelect />
                <Row>
                  <DateInput
                    name="content.options.availability.from"
                    shortDate
                    label="Available from"
                    minDate={new Date()}
                    showTimeSelect
                  />
                  <DateInput
                    name="content.options.availability.to"
                    shortDate
                    label="Available until"
                    minDate={new Date()}
                    showTimeSelect
                  />
                </Row>
              </Panel>
            </div>
          </div>
        </div>
      )}
    </FormContext.Consumer>
  );
};

export interface QuizDetailsProps {}

export default QuizDetails;
