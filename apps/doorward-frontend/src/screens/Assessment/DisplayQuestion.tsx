import React, { useCallback, useContext, useEffect, useState } from 'react';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { CreateQuestionBody } from '@doorward/common/dtos/body';
import Spacer from '@doorward/ui/components/Spacer';
import Icon from '@doorward/ui/components/Icon';
import QuestionView, { QuestionViewTypes } from '../../components/UI/AssessmentView/QuestionView';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';
import Button from '@doorward/ui/components/Buttons/Button';
import { useSelector } from 'react-redux';
import translate from '@doorward/common/lang/translate';
import { FormContext } from '@doorward/ui/components/Form';
import _, { add } from 'lodash';
import BadgeControl from '@doorward/ui/components/BadgeControl';
import Grid from '@doorward/ui/components/Grid';
import './styles/SingleQuestionAssessment.scss';

const DisplayQuestion: React.FunctionComponent<DisplayQuestionProps> = ({ section, view, questionNumber }) => {
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(section.questions[0]);
  const { formikProps } = useContext(FormContext);
  const [visible, setVisible] = useState(true);
  const [reviewMark, setReviewMark] = useState([]);

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

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
  const onClickQuestionNumber = (index) => {
    setIndex(index);
    setCurrentQuestion(section.questions[index]);
  };
  useEffect(() => {
    setCurrentQuestion(section.questions[index]);
    setIndex(index);
  }, [index]);

  const mark =(index) =>{
    setReviewMark(reviewMark.filter(i => i !== index));

  }

  const getQuestionsAnswered = useCallback(
    (section: QuestionSectionEntity) => {
      const result = [];
      section.questions.forEach((question) => {
        if (Object.keys(_.pickBy(formikProps.values.submission, _.identity)).includes(question.id)) {
          result.push(question.id);
        }
      });
      return result;
    },
    [formikProps.values]
  );

  const getDisabled = (section) => {
    const questionsAnswered = getQuestionsAnswered(section);

    let disableQuestion = !section.config.questions.allCompulsory && !section.config.questions?.answers?.answerAll;

    disableQuestion = disableQuestion && questionsAnswered.length === section.config.questions.numRequired;
    disableQuestion = disableQuestion && !questionsAnswered.includes(currentQuestion.id);
    return disableQuestion;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
      <div style={{ gridRowStart: 1 }}>
        {view === QuestionViewTypes.EXAM_MODE ? (
          <div>
            <QuestionView
              disabled={getDisabled(section)}
              question={currentQuestion}
              view={view}
              questionNumber={index + 1}
            />
            <div style={{ display: 'grid', gridColumnGap: 0 }}>
              <div style={{ gridColumnStart: 10 }}>
                {index > 0 && (
                  <Button theme="primary" onClick={() => previous(index)}>
                    {translate('previous')}
                  </Button>
                )}
              </div>
              {reviewMark.includes(index) ? (
                <div style={{ gridColumnStart: 11 }}>
                  <Button theme="primary" onClick={() => mark(index)}>
                    {translate('unReview')}
                  </Button>
                </div>
              ) : (
                <div style={{ gridColumnStart: 11 }}>
                  <Button theme="primary" onClick={() => reviewMark.push(index)}>
                    {translate('review')}
                  </Button>
                </div>
              )}

              <div style={{ gridColumnStart: 12 }}>
                {index < section.questions.length - 1 && (
                  <Button theme="primary" onClick={() => next(index)}>
                    {translate('next')}
                  </Button>
                )}
              </div>
            </div>

            <Spacer />
          </div>
        ) : (
          <QuestionView
            disabled={getDisabled(section)}
            question={currentQuestion}
            view={view}
            questionNumber={index + 1}
          />
        )}
      </div>
      <div style={{ gridRowStart: 1 }}>
        <Button onClick={() => (!visible ? onOpen() : onClose())}>{translate('openSidePanel')}</Button>
        {visible && (
          <div className="question-list-wrapper">
            <div className="question-list-inner">
              <Grid columns="4">
                {section.questions.map((question, index) => {
                  const questionsAnswered = getQuestionsAnswered(section);
                  if (questionsAnswered.includes(question.id)) {
                    if (reviewMark.includes(index)) {
                      return (
                        <BadgeControl value="R">
                          <Button theme="success" onClick={() => onClickQuestionNumber(index)}>
                            {index + 1}
                          </Button>
                        </BadgeControl>
                      );
                    } else
                      return (
                        <BadgeControl value={null}>
                          <Button theme="success" onClick={() => onClickQuestionNumber(index)}>
                            {index + 1}
                          </Button>
                        </BadgeControl>
                      );
                  }
                  return (
                    <Button theme="danger" onClick={() => onClickQuestionNumber(index)}>
                      {index + 1}
                    </Button>
                  );
                })}
              </Grid>
            </div>
          </div>
        )}

        <Spacer />
      </div>
    </div>
  );
};

export interface DisplayQuestionProps {
  section: QuestionSectionEntity;
  view?: QuestionViewTypes;
  questionNumber?: number;
}

export default DisplayQuestion;
