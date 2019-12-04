import React from 'react';
import { Quiz } from '../../../../services/models';
import ItemArray from '../../../ui/ItemArray';
import QuestionView from './QuestionView';
import BasicForm from '../../Forms/BasicForm';
import useForm from '../../../../hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';

export const QuizContext = React.createContext<QuizContextProps>({});

const QuizView: React.FunctionComponent<QuizViewProps> = props => {
  const initialValues = {
    answers: props.quiz.content.questions.reduce(
      (acc, question) => ({
        ...acc,
        [question.id]: '',
      }),
      {}
    ),
  };
  const form = useForm();
  const state = useSelector((state: State) => state.courses.addModuleItem);
  return (
    <QuizContext.Provider value={{ quiz: props.quiz }}>
      <BasicForm form={form} initialValues={initialValues} submitAction={() => ({ type: '' })} state={state}>
        <div className="ed-quiz">
          <ItemArray data={props.quiz.content.questions}>
            {(question, index) => <QuestionView question={question} index={index + 1} />}
          </ItemArray>
        </div>
      </BasicForm>
    </QuizContext.Provider>
  );
};

export interface QuizContextProps {
  quiz?: Quiz;
}

export interface QuizViewProps {
  quiz: Quiz;
}

export default QuizView;