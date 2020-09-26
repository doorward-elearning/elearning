import React from 'react';
import ItemArray from '@doorward/ui/components/ItemArray';
import QuestionView from './QuestionView';
import BasicForm from '../../Forms/BasicForm';
import useForm from '@doorward/ui/hooks/useForm';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import useDoorwardApi from '../../../hooks/useDoorwardApi';

export const QuizContext = React.createContext<QuizContextProps>({});

const QuizView: React.FunctionComponent<QuizViewProps> = (props) => {
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
  quiz?: ModuleItemEntity;
}

export interface QuizViewProps {
  quiz: ModuleItemEntity;
  onCancel: () => void;
}

export default QuizView;
