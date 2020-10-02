import React from 'react';
import ItemArray from '@doorward/ui/components/ItemArray';
import QuestionView from './QuestionView';
import BasicForm from '../../Forms/BasicForm';
import useForm from '@doorward/ui/hooks/useForm';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';

export const QuizContext = React.createContext<QuizContextProps>({});

const QuizView: React.FunctionComponent<QuizViewProps> = (props) => {
  const initialValues = {
    answers: (props.quiz.questions || []).reduce(
      (acc, question) => ({
        ...acc,
        [question.id]: '',
      }),
      {}
    ),
  };
  const form = useForm();
  const state = useDoorwardApi((state) => state.modules.createModuleItem);
  return (
    <QuizContext.Provider value={{ quiz: props.quiz }}>
      <BasicForm
        form={form}
        initialValues={initialValues}
        submitAction={() => ({ type: '' })}
        onCancel={props.onCancel}
        state={state}
      >
        {props.quiz.instructions && (
          <React.Fragment>
            <Header padded size={3}>
              Instructions
            </Header>
            <Panel>
              <DraftHTMLContent content={props.quiz.instructions} />
            </Panel>
          </React.Fragment>
        )}
        <Header padded size={3}>
          Quiz
        </Header>
        <div className="ed-quiz">
          <ItemArray data={props.quiz.questions}>
            {(question, index) => <QuestionView question={question} index={index + 1} />}
          </ItemArray>
        </div>
      </BasicForm>
    </QuizContext.Provider>
  );
};

export interface QuizContextProps {
  quiz?: QuizEntity;
}

export interface QuizViewProps {
  quiz: QuizEntity;
  onCancel: () => void;
}

export default QuizView;
