import React, { useCallback, useEffect, useState } from 'react';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { CreateQuestionBody } from '@doorward/common/dtos/body';
import Spacer from '@doorward/ui/components/Spacer';
import Icon from '@doorward/ui/components/Icon';
import QuestionView, { QuestionViewTypes } from '../../components/UI/AssessmentView/QuestionView';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';
import Button from '@doorward/ui/components/Buttons/Button';
import { useSelector } from 'react-redux';
import translate from '@doorward/common/lang/translate';

const DisplayQuestion: React.FunctionComponent<DisplayQuestionProps> = ({ section, view, questionNumber }) => {
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(section.questions[0]);

  const previous = (index) => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const next = (index) => {
    if (index < section.questions.length - 1) {
      setIndex(index + 1);
    }
  };
  useEffect(() => {
    setCurrentQuestion(section.questions[index]);
  }, [index]);

  return (
    <div>
      {view === QuestionViewTypes.EXAM_MODE ? (
        <div>
          <QuestionView question={currentQuestion} view={view} />

          <div style={{ display: 'grid', gridColumnGap: 0 }}>
            <div style={{ gridColumnStart: 10 }}>
              {index > 0 && (
                <Button theme="primary" onClick={() => previous(index)}>
                  <Icon icon="keyboard_arrow_left" />
                  {translate('previous')}
                </Button>
              )}
            </div>

            <div style={{ gridColumnStart: 11 }}>
              <Button theme="primary" onClick={() => next(index)}>
                {translate('next')}
                <Icon icon="keyboard_arrow_right"></Icon>
              </Button>
            </div>
          </div>

          <Spacer />
        </div>
      ) : (
        <QuestionView question={currentQuestion} view={view} />
      )}
    </div>
  );
};

export interface DisplayQuestionProps {
  section: QuestionSectionEntity;
  view?: QuestionViewTypes;
  questionNumber?: number;
}

export default DisplayQuestion;
