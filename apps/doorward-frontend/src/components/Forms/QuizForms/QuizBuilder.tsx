import React, { useContext, useEffect, useState } from 'react';
import './QuizBuilder.scss';
import Header from '@doorward/ui/components/Header';
import { FormContext } from '@doorward/ui/components/Form';
import Panel from '@doorward/ui/components/Panel';
import Button from '@doorward/ui/components/Buttons/Button';
import HeaderGrid from '@doorward/ui/components/Grid/HeaderGrid';
import { UseModal } from '@doorward/ui/hooks/useModal';
import { FieldArray } from 'formik';
import TabLayout from '@doorward/ui/components/TabLayout';
import { CreateQuestionBody } from '@doorward/common/dtos/body';
import QuestionView, { QuestionViewTypes } from '../../UI/QuizView/QuestionView';
import Tab from '@doorward/ui/components/TabLayout/Tab';

const NoQuestions = () => {
  return (
    <Panel>
      <p>No questions have been added.</p>
    </Panel>
  );
};

const QuestionDisplay: React.FunctionComponent<QuestionDisplayProps> = ({ question, onEditQuestion }): JSX.Element => {
  return (
    <QuestionView question={question} index={0} view={QuestionViewTypes.EDIT_MODE} onEditQuestion={onEditQuestion} />
  );
};

const QuizBuilder: React.FunctionComponent<QuizBuilderProps> = React.memo(
  (props): JSX.Element => {
    const { formikProps } = useContext(FormContext);
    const [arrayHelpers, setArrayHelpers] = useState();

    useEffect(() => {
      if (arrayHelpers && props.newQuestion) {
        arrayHelpers.push(props.newQuestion);
      }
    }, [props.newQuestion]);

    return (
      <React.Fragment>
        <FieldArray name="questions">
          {(_arrayHelpers) => {
            if (!arrayHelpers) {
              setArrayHelpers(_arrayHelpers);
            }
            return (
              <div className="ed-quiz-builder">
                <HeaderGrid>
                  <Header size={2} padded>
                    Questions
                  </Header>
                  <Button
                    type="button"
                    onClick={() => {
                      props.questionModal.openModal();
                    }}
                    icon="add"
                  >
                    Add Question
                  </Button>
                </HeaderGrid>
                {formikProps.values.questions.length ? (
                  <TabLayout openRecentTab wrapTabs>
                    {formikProps.values.questions.map((question, index) => (
                      <Tab title={`${index + 1}`}>
                        <QuestionDisplay
                          question={question}
                          onEditQuestion={() => {
                            props.onEditQuestion(question, index);
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

export interface QuizBuilderProps {
  questionModal: UseModal;
  newQuestion: CreateQuestionBody;
  onEditQuestion: (question: CreateQuestionBody, index: number) => void;
  editedQuestion: { question: CreateQuestionBody; index: number };
}

export interface QuestionDisplayProps {
  question: CreateQuestionBody;
  onEditQuestion: () => void;
}

export default QuizBuilder;
