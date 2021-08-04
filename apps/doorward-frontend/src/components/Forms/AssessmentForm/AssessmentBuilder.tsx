import React, { useContext, useState } from 'react';
import './AssessmentBuilder.scss';
import { FormContext } from '@doorward/ui/components/Form';
import Panel from '@doorward/ui/components/Panel';
import useModal from '@doorward/ui/hooks/useModal';
import { ArrayHelpers, FieldArray } from 'formik';
import { CreateQuestionBody, CreateQuestionSectionBody } from '@doorward/common/dtos/body';
import QuestionView, { QuestionViewTypes } from '../../UI/AssessmentView/QuestionView';
import AddQuestionModal from './AddQuestionModal';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import translate from '@doorward/common/lang/translate';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import Header from '@doorward/ui/components/Header';
import Button from '@doorward/ui/components/Buttons/Button';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import Checkbox from '@doorward/ui/components/Input/Checkbox';
import NumberField from '@doorward/ui/components/Input/NumberField';
import Row from '@doorward/ui/components/Row';

const defaultSection = (index: number) => ({
  order: index,
  instructions: '',
  config: {
    questions: {
      allCompulsory: true,
      numRequired: 1,
      answers: {
        answerAll: false,
      },
    },
  },
  questions: [],
});

const NoQuestions = () => {
  return (
    <Panel>
      <p>{translate('noQuestionsHaveBeenAdded')}</p>
    </Panel>
  );
};

const QuestionDisplay: React.FunctionComponent<QuestionDisplayProps> = ({
  question,
  onEditQuestion,
  onDeleteQuestion,
}): JSX.Element => {
  return (
    <QuestionView
      question={question}
      view={QuestionViewTypes.EDIT_MODE}
      onEditQuestion={onEditQuestion}
      onDeleteQuestion={onDeleteQuestion}
    />
  );
};

const QuestionBuilder: React.FunctionComponent<QuestionBuilderProps> = ({
  section,
  onEditQuestion,
  onDeleteQuestion,
  onAddQuestion,
}): JSX.Element => {
  return (
    <div>
      <HeaderGrid>
        <Header size={3} padded>
          {translate('questions')}
        </Header>
        <Button type="button" onClick={onAddQuestion}>
          {translate('addQuestion')}
        </Button>
      </HeaderGrid>
      {section.questions.length ? (
        <TabLayout openRecentTab wrapTabs>
          {section.questions.map((question, index) => (
            <Tab title={`${index + 1}`} key={index}>
              <QuestionDisplay
                question={question}
                onEditQuestion={() => {
                  onEditQuestion(question, index);
                }}
                onDeleteQuestion={() => {
                  onDeleteQuestion(index);
                }}
              />
            </Tab>
          ))}
        </TabLayout>
      ) : (
        <NoQuestions />
      )}
    </div>
  );
};

export const QuestionSectionConfig: React.FunctionComponent<QuestionSectionConfigProps> = ({
  sectionIndex,
  section,
}): JSX.Element => {
  return (
    <div className="mt-4 mb-4">
      <DraftTextArea
        name={`sections[${sectionIndex}].instructions`}
        label={translate('instructions')}
        labelPosition="top"
        fluid
        shy
      />
      <Panel>
        <Checkbox
          name={`sections[${sectionIndex}].config.questions.allCompulsory`}
          placeholder={translate('allQuestionsAreCompulsory')}
          labelPosition="left"
        />
        {!section.config?.questions?.allCompulsory && (
          <Panel>
            <NumberField
              name={`sections[${sectionIndex}].config.questions.numRequired`}
              placeholder={translate('numQuestionsRequired')}
              labelPosition="left"
              min={1}
            />
            <Checkbox
              name={`sections[${sectionIndex}].config.questions.answers.answerAll`}
              placeholder={translate('answerAllQuestionsChooseBest')}
              labelPosition="left"
            />
          </Panel>
        )}
      </Panel>
    </div>
  );
};

const QuestionSectionBuilder: React.FunctionComponent<QuestionSectionBuilderProps> = ({
  sectionIndex,
  section,
  ...props
}): JSX.Element => {
  const questionModal = useModal();
  const editQuestionModal = useModal();
  const [editQuestion, setEditQuestion] = useState();
  const [editQuestionIndex, setEditQuestionIndex] = useState();
  const [arrayHelpers, setArrayHelpers] = useState<ArrayHelpers>();

  editQuestionModal.onClose(() => {
    setEditQuestion(null);
  });

  return (
    <React.Fragment>
      <AddQuestionModal useModal={questionModal} onAddQuestion={arrayHelpers?.push} type={props.type} />
      {editQuestion && (
        <AddQuestionModal
          type={props.type}
          question={editQuestion}
          useModal={editQuestionModal}
          onAddQuestion={(question) => {
            arrayHelpers.replace(editQuestionIndex, question);
          }}
        />
      )}
      <Panel className="mt-4">
        <Header size={2}>{translate('sectionHeader', { index: sectionIndex + 1 })}</Header>
        <QuestionSectionConfig section={section} sectionIndex={sectionIndex} />
        <FieldArray name={`sections[${sectionIndex}].questions`}>
          {(_arrayHelpers) => {
            if (!arrayHelpers) {
              setArrayHelpers(_arrayHelpers);
            }
            return (
              <div className="ed-assessment-builder">
                <QuestionBuilder
                  sectionIndex={sectionIndex}
                  onAddQuestion={() => {
                    questionModal.openModal();
                  }}
                  section={section}
                  onEditQuestion={(question, index) => {
                    setEditQuestionIndex(index);
                    setEditQuestion(question);
                  }}
                  onDeleteQuestion={(index) => {
                    arrayHelpers.remove(index);
                  }}
                />
              </div>
            );
          }}
        </FieldArray>
      </Panel>
    </React.Fragment>
  );
};

const AssessmentBuilder: React.FunctionComponent<AssessmentBuilderProps> = React.memo((props): JSX.Element => {
  const { formikProps } = useContext(FormContext);
  const [arrayHelpers, setArrayHelpers] = useState<ArrayHelpers>();

  return (
    <React.Fragment>
      <FieldArray name="sections">
        {(_sectionArrayHelpers) => {
          if (!arrayHelpers) {
            setArrayHelpers(_sectionArrayHelpers);
          }
          return (
            <div className="ed-assessment-section-builder">
              {formikProps.values.sections.map((section, sectionIndex) => (
                <QuestionSectionBuilder
                  type={props.type}
                  section={{ ...section, config: section.config || defaultSection(sectionIndex).config }}
                  sectionIndex={sectionIndex}
                />
              ))}
            </div>
          );
        }}
      </FieldArray>
      <Button
        type="button"
        className="mt-4"
        onClick={() => arrayHelpers.push(defaultSection(formikProps.values.sections.length))}
      >
        {translate('addSection')}
      </Button>
    </React.Fragment>
  );
});

export interface AssessmentBuilderProps {
  type: AssessmentTypes;
  hasSections?: boolean;
  editing?: boolean;
}

export interface QuestionDisplayProps {
  question: CreateQuestionBody;
  onEditQuestion: () => void;
  onDeleteQuestion: () => void;
}

export interface QuestionBuilderProps {
  section: CreateQuestionSectionBody;
  sectionIndex: number;
  onEditQuestion: (question: CreateQuestionBody, index: number) => void;
  onDeleteQuestion: (index: number) => void;
  onAddQuestion: () => void;
}

export interface QuestionSectionBuilderProps {
  sectionIndex: number;
  type: AssessmentTypes;
  section: CreateQuestionSectionBody;
}

export interface QuestionSectionConfigProps {
  sectionIndex: number;
  section: CreateQuestionSectionBody;
}

export default AssessmentBuilder;
