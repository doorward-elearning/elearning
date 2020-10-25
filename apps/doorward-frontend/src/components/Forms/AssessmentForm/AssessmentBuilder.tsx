import React, { useContext, useEffect, useState } from 'react';
import './AssessmentBuilder.scss';
import Header from '@doorward/ui/components/Header';
import { FormContext } from '@doorward/ui/components/Form';
import Panel from '@doorward/ui/components/Panel';
import Button from '@doorward/ui/components/Buttons/Button';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import useModal from '@doorward/ui/hooks/useModal';
import { ArrayHelpers, FieldArray } from 'formik';
import TabLayout from '@doorward/ui/components/TabLayout';
import { CreateQuestionBody } from '@doorward/common/dtos/body';
import QuestionView, { QuestionViewTypes } from '../../UI/AssessmentView/QuestionView';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import AddQuestionModal from './AddQuestionModal';
import { AssessmentTypes } from '@doorward/common/types/moduleItems';
import translate from '@doorward/common/lang/translate';

const NoQuestions = () => {
  return (
    <Panel>
      <p>{translate.noQuestionsHaveBeenAdded()}</p>
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

const AssessmentBuilder: React.FunctionComponent<AssessmentBuilderProps> = React.memo(
  (props): JSX.Element => {
    const { formikProps } = useContext(FormContext);
    const [arrayHelpers, setArrayHelpers] = useState<ArrayHelpers>();
    const [editQuestionIndex, setEditQuestionIndex] = useState();
    const [editQuestion, setEditQuestion] = useState();
    const questionModal = useModal();
    const editQuestionModal = useModal();

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
        <FieldArray name="questions">
          {(_arrayHelpers) => {
            if (!arrayHelpers) {
              setArrayHelpers(_arrayHelpers);
            }
            return (
              <div className="ed-assessment-builder">
                <HeaderGrid>
                  <Header size={2} padded>
                    {translate.questions()}
                  </Header>
                  <Button
                    type="button"
                    onClick={() => {
                      questionModal.openModal();
                    }}
                    icon="add"
                  >
                    {translate.addQuestion()}
                  </Button>
                </HeaderGrid>
                {formikProps.values.questions.length ? (
                  <TabLayout openRecentTab wrapTabs>
                    {formikProps.values.questions.map((question, index) => (
                      <Tab title={`${index + 1}`} key={index}>
                        <QuestionDisplay
                          question={question}
                          onEditQuestion={() => {
                            setEditQuestionIndex(index);
                            setEditQuestion(question);
                          }}
                          onDeleteQuestion={() => {
                            _arrayHelpers.remove(index);
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
          }}
        </FieldArray>
      </React.Fragment>
    );
  }
);

export interface AssessmentBuilderProps {
  type: AssessmentTypes;
}

export interface QuestionDisplayProps {
  question: CreateQuestionBody;
  onEditQuestion: () => void;
  onDeleteQuestion: () => void;
}

export default AssessmentBuilder;
