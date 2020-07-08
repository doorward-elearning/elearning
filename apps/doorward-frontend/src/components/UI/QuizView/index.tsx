import React from 'react';
import ItemArray from '@doorward/ui/components/ItemArray';
import QuestionView from './QuestionView';
import BasicForm from '../../Forms/BasicForm';
import useForm from '@doorward/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { Quiz } from '@doorward/common/models/Quiz';

export const QuizContext = React.createContext<QuizContextProps>({});

const QuizView: React.FunctionComponent<QuizViewProps> = props => {
  console.log(props.quiz);
  const initialValues = {
    answers: (props.quiz.content.questions || []).reduce(
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
      <BasicForm
        form={form}
        initialValues={initialValues}
        submitAction={() => ({ type: '' })}
        onCancel={props.onCancel}
        state={state}
      >
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
  onCancel: () => void;
}

export default QuizView;